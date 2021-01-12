/*! For license information please see turnmarker.js.LICENSE.txt */
(()=>{"use strict";var e={"./src/scripts/chatter.js":(e,t,a)=>{a.r(t),a.d(t,{Chatter:()=>n});var s=a("./src/scripts/settings.js");class n{static sendTurnMessage(e,t=!1){let a=[];e.players.forEach((e=>{a.push(e.name)})),0==a.length&&a.push("GM");let n=e.actor.name,r=n;s.Settings.getAnnounceTokenName()&&(n=e.token.name,r=e.name),t&&!e.actor.hasPlayerOwner&&(n="???"),ChatMessage.create({speaker:{actor:e.actor,alias:r},content:`<div class="flexrow">${this.placeImage(e)}\n                    <div style="flex: 12;">\n                        <h2>${n}'s Turn</h2>\n                        <p>${a.join(" - ")}</p>\n                    </div>\n                    </div><em>Turn Marker</em>`})}static placeImage(e){if(s.Settings.getIncludeAnnounceImage()){let t=e.img;return e.flags.core&&e.flags.core.thumb&&(t=e.flags.core.thumb),`<div style="flex:3;"><img src="${t}" style="border: none;" /></div>`}return""}}},"./src/scripts/marker.js":(e,t,a)=>{a.r(t),a.d(t,{Marker:()=>i});var s=a("./src/scripts/markeranimation.js"),n=a("./src/scripts/settings.js"),r=a("./src/scripts/utils.js");class i{static async placeTurnMarker(e,t){if(t)return this.moveMarkerToToken(e,t),t;if(this.clearAllMarkers(),n.Settings.getTurnMarkerEnabled()){let t=(0,r.findTokenById)(e),a=(n.Settings.getRatio(),this.getImageDimensions(t)),s=this.getImageLocation(t),i=new Tile({img:n.Settings.getImagePath(),width:a.w,height:a.h,x:s.x,y:s.y,z:900,rotation:0,hidden:t.data.hidden,locked:!1,flags:{turnMarker:!0}});return(await canvas.scene.createEmbeddedEntity("Tile",i.data))._id}return null}static async deleteStartMarker(){const e=canvas.scene.getEmbeddedCollection("Tile").filter((e=>e.flags.startMarker)).map((e=>e._id));await canvas.scene.deleteEmbeddedEntity("Tile",e)}static async placeStartMarker(e){if(n.Settings.getStartMarkerEnabled()){let t=(0,r.findTokenById)(e),a=this.getImageDimensions(t),s=this.getImageLocation(t),i=new Tile({img:n.Settings.getStartMarker(),width:a.w,height:a.h,x:s.x,y:s.y,z:900,rotation:0,hidden:t.data.hidden,locked:!1,flags:{startMarker:!0}});game.user.isGM&&(canvas.scene.createEmbeddedEntity("Tile",i.data),canvas.scene.setFlag(r.FlagScope,r.Flags.startMarkerPlaced,!0))}}static async moveMarkerToToken(e,t){let a=(0,r.findTokenById)(e),s=(n.Settings.getRatio(),this.getImageDimensions(a)),i=this.getImageLocation(a);await canvas.scene.updateEmbeddedEntity("Tile",{_id:t,width:s.w,height:s.h,x:i.x,y:i.y,hidden:a.data.hidden})}static async clearAllMarkers(){let e=canvas.scene.getEmbeddedCollection("Tile");for(let t of e)(t.flags.turnMarker||t.flags.startMarker)&&await canvas.scene.deleteEmbeddedEntity("Tile",t._id)}static updateImagePath(){if(game.user.isGM){let e=canvas.tiles.placeables.find((e=>1==e.data.flags.turnMarker));e&&canvas.scene.updateEmbeddedEntity("Tile",{_id:e.id,img:n.Settings.getImagePath()})}}static reset(e){s.MarkerAnimation.stopAnimation(e),this.clearAllMarkers()}static getImageDimensions(e,t=!1){let a=t?1:n.Settings.getRatio(),s=0,r=0;switch(canvas.grid.type){case 2:case 3:s=r=e.h*a;break;case 4:case 5:s=r=e.w*a;break;default:s=e.w*a,r=e.h*a}return{w:s,h:r}}static getImageLocation(e,t=!1){let a=t?1:n.Settings.getRatio(),s=0,r=0;switch(canvas.grid.type){case 2:case 3:s=e.center.x-e.h*a/2,r=e.center.y-e.h*a/2;break;case 4:case 5:s=e.center.x-e.w*a/2,r=e.center.y-e.w*a/2;break;default:s=e.center.x-e.w*a/2,r=e.center.y-e.h*a/2}return{x:s,y:r}}}},"./src/scripts/markeranimation.js":(e,t,a)=>{a.r(t),a.d(t,{MarkerAnimation:()=>n});var s=a("./src/scripts/settings.js");class n{static startAnimation(e,t){let a=canvas.scene.getEmbeddedEntity("Tile",t);return e=this.animateRotation.bind(a),canvas.app.ticker.add(e),e}static stopAnimation(e){canvas.app.ticker.remove(e)}static animateRotation(e){let t=canvas.tiles.placeables.find((e=>1==e.data.flags.turnMarker));if(t&&t.data.img){let a=s.Settings.getInterval()/1e4;try{t.tile.img.rotation+=a*e}catch(e){}}}}},"./src/scripts/settings.js":(e,t,a)=>{a.r(t),a.d(t,{imageTitles:()=>M,announcedActorOptions:()=>v,Settings:()=>y});var s=a("./src/scripts/marker.js"),n=a("./src/scripts/settingsForm.js"),r=a("./src/scripts/utils.js");const i="tm-version",o="ratio",m="animation",g="interval",c="announce-turn",d="announce-Actors",l="announce-image",u="announce-token",p="image",h="customimage",k="turnmarker-enabled",f="startMarker-enabled",b="startMarker-custom",M=["Runes of Incendium by Rin","Runes of the Cultist by Rin","Runes of Regeneration by Rin","Runes of the Cosmos by Rin","Runes of Earthly Dust by Rin","Runes of Reality by Rin","Runes of the Believer by Rin","Runes of the Mad Mage by Rin","Runes of the Blue Sky by Rin","Runes of the Universe by Rin","Runes of Prosperity by Rin"],v=["Announce for all","Announce for players","Announce for GM-controlled","Announce all but hide GM-controlled names"];class y{static getVersion(){return game.settings.get(r.modName,i)}static setVersion(e){game.settings.set(r.modName,i,e)}static getRatio(){return game.settings.get(r.modName,o)}static setRatio(e){game.settings.set(r.modName,o,e)}static getShouldAnimate(){return game.settings.get(r.modName,m)}static getInterval(){return game.settings.get(r.modName,g)}static shouldAnnounceTurns(){return game.settings.get(r.modName,c)}static setShouldAnnounceTurns(e){game.settings.set(r.modName,c,e)}static getAnnounceActors(){return game.settings.get(r.modName,d)}static setAnnounceActors(e){return game.settings.set(r.modName,d,e)}static getAnnounceTokenName(){return game.settings.get(r.modName,u)}static setAnnounceTokenName(e){return game.settings.set(r.modName,u,e)}static getIncludeAnnounceImage(){return game.settings.get(r.modName,l)}static setIncludeAnnounceImage(e){game.settings.set(r.modName,l,e)}static getImageIndex(){return game.settings.get(r.modName,p)}static getStartMarker(){return""==game.settings.get(r.modName,b).trim()?"modules/turnmarker/assets/start.png":game.settings.get(r.modName,b)}static getTurnMarkerEnabled(){return game.settings.get(r.modName,k)}static setTurnMarkerEnabled(e){game.settings.set(r.modName,k,e)}static getStartMarkerEnabled(){return game.settings.get(r.modName,f)}static setStartMarkerEnabled(e){game.settings.set(r.modName,f,e)}static getStartMarkerPath(){return game.settings.get(r.modName,b)}static setStartMarkerPath(e){game.settings.set(r.modName,b,e)}static getImagePath(){return""==game.settings.get(r.modName,h).trim()?this.getImageByIndex(game.settings.get(r.modName,p)):game.settings.get(r.modName,h)}static getImageByIndex(e){switch(e){case 0:return"modules/turnmarker/assets/incendium.png";case 1:return"modules/turnmarker/assets/cultist.png";case 2:return"modules/turnmarker/assets/regeneration.png";case 3:return"modules/turnmarker/assets/cosmos.png";case 4:return"modules/turnmarker/assets/earthlydust.png";case 5:return"modules/turnmarker/assets/reality.png";case 6:return"modules/turnmarker/assets/believer.png";case 7:return"modules/turnmarker/assets/madmage.png";case 8:return"modules/turnmarker/assets/bluesky.png";case 9:return"modules/turnmarker/assets/universe.png";case 10:return"modules/turnmarker/assets/prosperity.png"}}static setImage(e){game.settings.set(r.modName,p,e)}static getCustomImagePath(){return game.settings.get(r.modName,h)}static setCustomImagePath(e){game.settings.set(r.modName,h,e)}static registerSettings(){game.settings.registerMenu(r.modName,"tm.settingsMenu",{name:"tm.settings.button.name",label:"tm.settings.button.label",icon:"fas fa-sync-alt",type:n.SettingsForm,restricted:!0}),game.settings.register(r.modName,i,{name:`${r.modName} version`,default:"0.0.0",type:String,scope:"world"}),game.settings.register(r.modName,o,{name:"tm.settings.ratio.name",hint:"tm.settings.ratio.hint",scope:"world",config:!1,type:Number,default:1.5,restricted:!0}),game.settings.register(r.modName,m,{name:"tm.settings.animate.name",hint:"tm.settings.animate.hint",scope:"user",config:!0,type:Boolean,default:!0}),game.settings.register(r.modName,g,{name:"tm.settings.interval.name",hint:"tm.settings.interval.hint",scope:"user",config:!0,type:Number,default:100}),game.settings.register(r.modName,p,{name:"tm.settings.image.name",scope:"world",config:!1,type:Number,default:0,choices:M,restricted:!0,onChange:e=>s.Marker.updateImagePath(e)}),game.settings.register(r.modName,d,{name:"tm.settings.announcedActors.name",hint:"tm.settings.announcedActors.hint",scope:"world",config:!1,type:Number,default:0,restricted:!0,choices:v}),game.settings.register(r.modName,u,{name:"tm.settings.announceTokenName.name",hint:"tm.settings.announceTokenName.hint",scope:"world",config:!1,type:Boolean,default:!1,restricted:!0}),game.settings.register(r.modName,h,{name:"tm.settings.customImage.name",hint:"tm.settings.customImage.hint",scope:"world",config:!1,type:String,default:"",restricted:!0,onChange:e=>s.Marker.updateImagePath(e)}),game.settings.register(r.modName,c,{name:"tm.settings.announce.name",hint:"tm.settings.announce.hint",scope:"world",config:!1,type:Boolean,default:!0}),game.settings.register(r.modName,l,{name:"tm.settings.announceImage.name",hint:"tm.settings.announceImage.hint",scope:"world",config:!1,type:Boolean,default:!0}),game.settings.register(r.modName,"announce-asActor",{name:"tm.settings.announceAs.name",hint:"tm.settings.announceAs.hint",scope:"world",config:!1,type:Boolean,default:!0}),game.settings.register(r.modName,k,{name:"tm.settings.turnMarkerEnabled.name",hint:"tm.settings.turnMarkerEnabled.hint",scope:"world",config:!1,type:Boolean,default:!0,restricted:!0}),game.settings.register(r.modName,f,{name:"tm.settings.startEnabled.name",hint:"tm.settings.startEnabled.hint",scope:"world",config:!1,type:Boolean,default:!1,restricted:!0}),game.settings.register(r.modName,b,{name:"tm.settings.startImage.name",hint:"tm.settings.startImage.hint",scope:"world",config:!1,type:String,default:"",restricted:!0})}}},"./src/scripts/settingsForm.js":(e,t,a)=>{a.r(t),a.d(t,{SettingsForm:()=>r});var s=a("./src/scripts/settings.js");const n=["mp4","webm","ogg"];class r extends FormApplication{constructor(e,t={}){super(e,t)}static get defaultOptions(){return mergeObject(super.defaultOptions,{id:"turnmarker-settings-form",title:"Turn Marker - Global Settings",template:"./modules/turnmarker/templates/settings.html",classes:["sheet","tm-settings"],width:500,closeOnSubmit:!0})}getData(){return{turnMarkerEnabled:s.Settings.getTurnMarkerEnabled(),ratio:s.Settings.getRatio(),image:this.getSelectList(s.imageTitles,s.Settings.getImageIndex()),announceActors:this.getSelectList(s.announcedActorOptions,s.Settings.getAnnounceActors()),customImage:s.Settings.getCustomImagePath(),announce:s.Settings.shouldAnnounceTurns(),announceImage:s.Settings.getIncludeAnnounceImage(),announceTokenName:s.Settings.getAnnounceTokenName(),startMarkerEnabled:s.Settings.getStartMarkerEnabled(),startMarkerPath:s.Settings.getStartMarkerPath(),previewPath:s.Settings.getImagePath()}}async _updateObject(e,t){console.log("Turn Marker | Saving Settings"),s.Settings.setRatio(t.ratio),t.image&&s.Settings.setImage(t.image),s.Settings.setCustomImagePath(t.customImage),s.Settings.setShouldAnnounceTurns(t.announce),s.Settings.setAnnounceActors(t.announceActors),s.Settings.setIncludeAnnounceImage(t.announceImage),s.Settings.setAnnounceTokenName(t.announceTokenName),s.Settings.setTurnMarkerEnabled(t.turnMarkerEnabled),s.Settings.setStartMarkerEnabled(t.startMarkerEnabled),s.Settings.setStartMarkerPath(t.startMarkerPath)}activateListeners(e){super.activateListeners(e);const t=e.find("#image"),a=e.find("#customImage"),n=e.find("#markerImgPreview");this.updatePreview(e),t.length>0&&t.on("change",(e=>{""==a[0].value.trim()&&n.attr("src",s.Settings.getImageByIndex(Number(e.target.value)))})),a.length>0&&a.on("change",(t=>{this.updatePreview(e)}))}updatePreview(e){const t=e.find("#image"),a=e.find("#customImage"),r=e.find("#markerImgPreview"),i=e.find("#markerVideoPreview");if(""==a[0].value.trim())t[0].disabled=!1,r.attr("src",s.Settings.getImageByIndex(Number(t[0].value))),r.removeClass("hidden"),i.addClass("hidden");else{t[0].disabled=!0;const e=this.getExtension(a[0].value);console.warn(e),n.includes(e.toLowerCase())?(i.attr("src",a[0].value),r.addClass("hidden"),i.removeClass("hidden")):(r.attr("src",a[0].value),r.removeClass("hidden"),i.addClass("hidden"))}}getExtension(e){return e.slice(2+(e.lastIndexOf(".")-1>>>0))}getSelectList(e,t){let a=[];return e.forEach(((e,s)=>{a.push({value:e,selected:s==t})})),a}}},"./src/scripts/turnmarker.js":(e,t,a)=>{a.r(t);var s=a("./src/scripts/chatter.js"),n=a("./src/scripts/marker.js"),r=a("./src/scripts/markeranimation.js"),i=a("./src/scripts/settings.js"),o=a("./src/scripts/updateWindow.js"),m=a("./src/scripts/utils.js");let g,c,d="";Hooks.on("ready",(async()=>{i.Settings.registerSettings();let e=canvas.tiles.placeables.find((e=>1==e.data.flags.turnMarker));if(e&&e.id){c=e.id;let t=canvas.tiles.placeables.find((e=>1==e.data.flags.turnMarker));t.zIndex=Math.max(...canvas.tiles.placeables.map((e=>e.zIndex)))+1,t.parent.sortChildren(),!game.paused&&i.Settings.getShouldAnimate()&&(g=r.MarkerAnimation.startAnimation(g,c))}game.user.isGM&&isNewerVersion(game.modules.get("turnmarker").data.version,i.Settings.getVersion())&&(0,o.renderUpdateWindow)()})),Hooks.on("createTile",((e,t)=>{1==t.flags.turnMarker&&(c=t._id,(t=canvas.tiles.placeables.find((e=>1==e.data.flags.turnMarker))).zIndex=Math.max(...canvas.tiles.placeables.map((e=>e.zIndex)))+1,t.parent.sortChildren(),i.Settings.getShouldAnimate()&&(g=r.MarkerAnimation.startAnimation(g,c)))})),Hooks.on("updateCombat",(async(e,t)=>{if(e.started||await n.Marker.deleteStartMarker(),e.combatant&&t&&d!=e.combatant._id&&game.user.isGM&&game.userId==(0,m.firstGM)()&&(d=e.combatant._id,e&&e.combatant&&e.started)){await n.Marker.placeStartMarker(game.combat.combatant.token._id);let t=canvas.tiles.placeables.find((e=>1==e.data.flags.turnMarker)),a=await n.Marker.placeTurnMarker(e.combatant.token._id,t&&t.id||void 0);if(a&&(c=a.markerId,g=a.animator),i.Settings.getTurnMarkerEnabled()&&(await n.Marker.deleteStartMarker(),canvas.scene.unsetFlag(m.FlagScope,m.Flags.startMarkerPlaced)),i.Settings.shouldAnnounceTurns()&&!e.combatant.hidden)switch(i.Settings.getAnnounceActors()){case 0:s.Chatter.sendTurnMessage(e.combatant);break;case 1:e.combatant.actor.hasPlayerOwner&&s.Chatter.sendTurnMessage(e.combatant);break;case 2:e.combatant.actor.hasPlayerOwner||s.Chatter.sendTurnMessage(e.combatant);break;case 3:s.Chatter.sendTurnMessage(e.combatant,!0)}}})),Hooks.on("deleteCombat",(async()=>{game.user.isGM&&await n.Marker.clearAllMarkers(),r.MarkerAnimation.stopAnimation(g)})),Hooks.on("updateToken",(async(e,t,a)=>{let s=canvas.tiles.placeables.find((e=>1==e.data.flags.turnMarker));s&&(a.x||a.y||a.width||a.height||a.hidden)&&game&&game.combat&&game.combat.combatant&&game.combat.combatant.tokenId==t._id&&game.user.isGM&&game.combat&&(await n.Marker.moveMarkerToToken(t._id,s.id),s.zIndex=Math.max(...canvas.tiles.placeables.map((e=>e.zIndex)))+1,s.parent.sortChildren())})),Hooks.on("updateTile",(async()=>{if(canvas.scene.data.tokenVision){let e=canvas.tiles.placeables.find((e=>1==e.data.flags.turnMarker));if(e){let t=canvas.tokens.placeables.find((e=>e.id==game.combat.combatant.tokenId));t&&!t.data.hidden&&(e.visible=canvas.sight.testVisibility(t.center,{tolerance:canvas.dimensions.size/4}))}}})),Hooks.on("pauseGame",(async e=>{c&&i.Settings.getShouldAnimate()&&(e?r.MarkerAnimation.stopAnimation(g):g=r.MarkerAnimation.startAnimation(g,c))}))},"./src/scripts/updateWindow.js":(e,t,a)=>{a.r(t),a.d(t,{renderUpdateWindow:()=>n});var s=a("./src/scripts/settings.js");function n(){const e=game.modules.get("turnmarker");if(isNewerVersion(e.data.version,s.Settings.getVersion())){class t extends Application{static get defaultOptions(){return mergeObject(super.defaultOptions,{template:`modules/${e.id}/templates/updateWindow.html`,resizable:!1,width:500,height:600,classes:["updateWindow"],title:`${e.data.title} - Updated`})}getData(){return{version:e.data.version}}activateListeners(t){super.activateListeners(t),t.find(".show-again").on("change",(t=>{s.Settings.setVersion(t.currentTarget.checked?e.data.version:oldVersion)}))}}(new t).render(!0)}}},"./src/scripts/utils.js":(e,t,a)=>{a.r(t),a.d(t,{modName:()=>s,FlagScope:()=>n,Flags:()=>r,socketName:()=>i,socketAction:()=>o,findTokenById:()=>m,firstGM:()=>g});const s="turnmarker",n="turnmarker",r={startMarkerPlaced:"startMarkerPlaced"},i="module.turnmarker",o={placeStartMarker:0};function m(e){return canvas.tokens.ownedTokens.find((t=>t.id==e))}function g(){for(let e of game.users.entities)if(e.data.role>=4&&e.active)return e.data._id}}},t={};function a(s){if(t[s])return t[s].exports;var n=t[s]={exports:{}};return e[s](n,n.exports,a),n.exports}a.d=(e,t)=>{for(var s in t)a.o(t,s)&&!a.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),a.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a("./src/scripts/turnmarker.js")})();
//# sourceMappingURL=turnmarker.js.map