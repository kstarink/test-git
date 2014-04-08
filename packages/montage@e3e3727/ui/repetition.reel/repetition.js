var Montage=require("montage").Montage,Component=require("ui/component").Component,Template=require("core/template").Template,RangeController=require("core/range-controller").RangeController,Promise=require("core/promise").Promise,Map=require("collections/map"),Set=require("collections/set"),deprecationWarning=require("../../core/deprecate").deprecationWarning,Observers=require("frb/observers"),observeProperty=Observers.observeProperty,observeKey=Observers.observeKey,Iteration=exports.Iteration=Montage.specialize({repetition:{value:null},controller:{value:null},object:{value:null},selected:{value:null},_fragment:{value:null},_childComponents:{value:null},index:{value:null},_drawnIndex:{value:null},active:{value:null},_noTransition:{value:null},_templateDocumentPart:{value:null},isDirty:{value:!1},constructor:{value:function Iteration(){this.super(),this.repetition=null,this.controller=null,this.object=null,this.defineBinding("selected",{"<->":"object.defined() ? repetition.contentController.selection.has(object) : selected"}),this._fragment=null,this._childComponents=null,this.index=null,this._drawnIndex=null,this.active=!1,this.defineBinding("active",{"<->":"repetition.activeIterations.has(())"}),this._noTransition=!1,this.addOwnPropertyChangeListener("active",this),this.addOwnPropertyChangeListener("selected",this),this.addOwnPropertyChangeListener("_noTransition",this),this.addPathChangeListener("index.defined() && _childComponents.defined()",this,"handleComponentModelChange"),this.cachedFirstElement=null}},initWithRepetition:{value:function(e){return this.repetition=e,this}},recycle:{value:function(){this.index=null,this.object=null,this._noTransition=!0}},injectIntoDocument:{value:function(e){null!==this._drawnIndex&&this.retractFromDocument();var t=this,n=this.repetition,i=n.element,r=n._boundaries,a=i.ownerDocument.createTextNode(""),o=r[e];r.splice(e,0,a),i.insertBefore(a,o),i.insertBefore(this._fragment,o),n._drawnIterations.splice(e,0,this),n._updateDrawnIndexes(e),n._addDirtyClassListIteration(this);var s=this._childComponents.length,l=function(e){e.target.removeEventListener("firstDraw",l,!1),s--,s||t.forEachElement(function(e){n._iterationForElement.set(e,t)})};if(this._childComponents.length>0)for(var u=0;this._childComponents.length>u;u++){var c=this._childComponents[u];c.addEventListener("firstDraw",l,!1),c.needsDraw=!0}else this.forEachElement(function(e){n._iterationForElement.set(e,t)})}},retractFromDocument:{value:function(){var e=this._drawnIndex,t=this.repetition,n=t.element,i=t._boundaries[e],r=t._boundaries[e+1];t._boundaries.splice(e,1);for(var a=this._fragment,o=i.nextSibling;o!=r;){var s=o.nextSibling;n.removeChild(o),a.appendChild(o),o=s}n.removeChild(i),this._drawnIndex=null,t._drawnIterations.splice(e,1),t._updateDrawnIndexes(e)}},handleComponentModelChange:{value:function(e){e?this._childComponents.forEach(this.repetition.addChildComponent,this.repetition):this._childComponents&&this._childComponents.forEach(this.repetition.removeChildComponent,this.repetition)}},handlePropertyChange:{value:function(){this.repetition&&(this.repetition._addDirtyClassListIteration(this),this.repetition.needsDraw=!0)}},forEachElement:{value:function(e,t){var n=this.repetition,i=this._drawnIndex;if(null!=i)for(var r=n._boundaries[i];r!==n._boundaries[i+1];r=r.nextSibling)1===r.nodeType&&e.call(t,r)}},firstElement:{get:function(){var e=this.repetition,t=this._drawnIndex;if(null!=t)for(var n=e._boundaries[t];n!==e._boundaries[t+1];n=n.nextSibling)if(1===n.nodeType)return this.cachedFirstElement=n,n}},cachedFirstElement:{value:null}}),Repetition=exports.Repetition=Component.specialize({initWithContent:{value:function(e){return this.object=e,this}},initWithContentController:{value:function(e){return this.contentController=e,this}},content:{get:function(){return this.getPath("contentController.content")},set:function(e){this.contentController=(new RangeController).initWithContent(e)}},contentController:{value:null},isSelectionEnabled:{value:null},selection:{value:null},selectedIterations:{value:null},selectedIndexes:{value:null},activeIterations:{value:null},iterations:{value:null},currentIteration:{value:null},objectAtCurrentIteration:{value:null},hasTemplate:{value:!1},_iterationTemplate:{value:null},clonesChildComponents:{value:!0},constructor:{value:function(){this.super(),this.contentController=null,this.organizedContent=[],this.defineBinding("organizedContent.rangeContent()",{"<-":"contentController.organizedContent"}),this.isSelectionEnabled=!1,this.defineBinding("selection",{"<->":"contentController.selection"}),this.defineBinding("selectedIterations",{"<-":"iterations.filter{selected}"}),this.defineBinding("selectedIndexes",{"<-":"selectedIterations.map{index}"}),this._iterationTemplate=null,this.addPathChangeListener(this._setupRequirements,this,"_handleSetupRequirementsChange"),this.addPathChangeListener("innerTemplate",this,"_handleInnerTemplateChange"),this.iterations=[],this._drawnIterations=[],this._freeIterations=[],this._contentForIteration=Map(),this._iterationForElement=Map(),this.currentIteration=null,this._templateId=null,this._iterationCreationPromise=Promise.resolve(),this._boundaries=[],this._dirtyClassListIterations=Set(),this._requestedIterations=0,this._createdIterations=0,this._canDrawInitialContent=!1,this._initialContentDrawn=!1,this.addOwnPropertyChangeListener("isSelectionEnabled",this),this._selectionPointer=null,this.activeIterations=[]}},_setupRequirements:{value:"[!_iterationTemplate.defined(),!_newDomContent.defined(),!_shouldClearDomContentOnNextDraw,_isComponentExpanded,_ownerDocumentPart.defined()].every{}"},_handleSetupRequirementsChange:{value:function(e){e&&this._setupIterationTemplate()}},_handleInnerTemplateChange:{value:function(e){this._iterationTemplate&&this._teardownIterationTemplate(),e&&this.getPath(this._setupRequirements)&&this._setupIterationTemplate()}},cleanupDeletedComponentTree:{value:function(e){var t=this._innerTemplate;this._innerTemplate=null,t&&this._teardownIterationTemplate(),e&&this.cancelBindings()}},expandComponent:{value:function(){return this._isComponentExpanded=!0,Promise.resolve()}},_buildIterationTemplate:{value:function(){var e,t,n,i;return e=this.innerTemplate.clone(),t=e.getSerialization(),n=t.getSerializationObject(),i=Montage.getInfoForObject(this).label,this._iterationLabel=i+":iteration",n[this._iterationLabel]={},e.setObjects(n),this.innerTemplate.hasParameters()&&this._expandIterationTemplateParameters(e),window._montage_le_flag&&(e.refresher=this,this._leTagIterationTemplate(e)),e}},_rebuildIterationTemplate:{value:function(){var e,t=this._iterationTemplate,n=this.iterations;this._purgeFreeIterations();for(var i,r=0;i=n[r];r++)i.isDirty=!0;this._innerTemplate=null,e=this._buildIterationTemplate(),t.replaceContentsWithTemplate(e)}},refreshTemplate:{value:function(){this._rebuildIterationTemplate()}},_setupIterationTemplate:{value:function(){var e=this;this._iterationTemplate=this._buildIterationTemplate();for(var t,n=e.childComponents,i=n.length-1;t=n[i--];)t.detachFromParentComponent(),t.needsDraw=!1,t.cleanupDeletedComponentTree(!0);e.handleOrganizedContentRangeChange(e.organizedContent,[],0),e.organizedContent.addRangeChangeListener(e,"organizedContent"),e._canDrawInitialContent=!0,e.needsDraw=!0}},_leTagIterationTemplate:{value:function(e){var t=e.document.body;if(t.children.length>0){var n=this.ownerComponent._montage_metadata.moduleId,i=this._montage_metadata.label;this._leTagStarArgument(n,i,t)}}},_teardownIterationTemplate:{value:function(){this.organizedContent.removeRangeChangeListener(this,"organizedContent"),this.handleOrganizedContentRangeChange([],this.organizedContent,0),this._purgeFreeIterations(),this._iterationTemplate=null,this._contentForIteration.clear(),this._iterationForElement.clear(),this.currentIteration=null,this._templateId=null,this._requestedIterations=0,this._createdIterations=0,this._canDrawInitialContent=!1,this._selectionPointer=null,this.activeIterations.clear(),this._dirtyClassListIterations.clear()}},_purgeFreeIterations:{value:function(){for(var e=0;this._freeIterations.length>e;e++)for(var t=this._freeIterations[e],n=0;t._childComponents.length>n;n++){var i=t._childComponents[n];this.removeChildComponent(i),i.cleanupDeletedComponentTree(!0)}this._freeIterations.clear()}},_expandIterationTemplateParameters:{value:function(e){for(var t,n,i,r,a,o,s,l,u,c=this;e.hasParameters();){c=c.ownerComponent,t=c._ownerDocumentPart.template,r=c._ownerDocumentPart.objects,o=e.expandParameters(c),i=e.getSerialization().getExternalObjectLabels(),a=e.getInstances(),l=o.labels,n=o.labelsCollisions;for(var h,d=0;h=l[d];d++)s=n&&h in n?n[h]:h,i.indexOf(s)>=0?a[s]=r[h]:(u=t.getObjectMetadata(h),u.owner||(u.owner=r.owner),e.setObjectMetadata(s,u.require,u.label,u.owner))}}},_iterationLabel:{value:null},_iterationCreationPromise:{value:null},_createIteration:{value:function(){var e=this,t=(new this.Iteration).initWithRepetition(this);return this._iterationCreationPromise=this._iterationCreationPromise.then(function(){var n,i,r=e.element.ownerDocument;return e.currentIteration=t,n=e._iterationTemplate.getInstances(),n=Object.create(n),n[e._iterationLabel]=t,i=e._iterationTemplate.instantiateWithInstances(n,r).then(function(n){n.parentDocumentPart=e._ownerDocumentPart,t._templateDocumentPart=n,n.loadComponentTree().then(function(){t._fragment=n.fragment,t._childComponents=n.childComponents,e.constructIteration(t)}).done(),e.currentIteration=null}),i.done(),i.then(null,function(){})}),this._requestedIterations++,t}},constructIteration:{value:function(){this._createdIterations++,this._createdIterations>=this._requestedIterations&&(this.needsDraw=!0,this._canDraw=!0)}},observeProperty:{value:function(e,t,n){return"contentAtCurrentIteration"===e||"objectAtCurrentIteration"===e?("contentAtCurrentIteration"===e?deprecationWarning("contentAtCurrentIteration",":iteration.object"):"objectAtCurrentIteration"===e&&deprecationWarning("objectAtCurrentIteration",":iteration.object"),observeKey(this._contentForIteration,this.currentIteration,t,n)):"currentIteration"===e?(deprecationWarning("currentIteration",":iteration"),t(this.currentIteration)):observeProperty(this,e,t,n)}},makePropertyObservable:{value:function(e){return"currentIteration"!==e?Montage.makePropertyObservable.call(this,e):void 0}},_controllerIterations:{value:null},_drawnIterations:{value:null},_freeIterations:{value:null},_contentForIteration:{value:null},handleOrganizedContentRangeChange:{value:function(e,t,n){var i=this.iterations,r=this._contentForIteration;this._iterationTemplate.isDirty&&this._iterationTemplate.refresh();var a=Math.min(e.length,t.length),o=t.length-a,s=e.length-a;if(a>0)for(var l=0;a>l;l++,n++)i[n].object=e[l],r.set(i[n],e[l]);if(o>0){var u=i.splice(n,o);u.forEach(function(e){e.recycle()});for(var c,l=0;c=u[l];l++)c.isDirty||this._freeIterations.push(c)}if(s>0){for(;s>this._freeIterations.length;)this._freeIterations.push(this._createIteration());for(var h=Array(s),l=a,d=0;e.length>l;l++,d++){var p=this._freeIterations.pop(),m=e[l];p.object=m,r.set(p,m),h[d]=p}i.swap(n,0,h)}(o>0||s>0)&&this._updateIndexes(n),this.needsDraw=!0}},_updateIndexes:{value:function(e){for(var t=this.iterations;t.length>e;e++)t[e].index=e}},_addDirtyClassListIteration:{value:function(e){e.forEachElement(function(t){var n;t&&(n=t.component)?(n.classList[e.active?"add":"remove"]("active"),n.classList[e.selected?"add":"remove"]("selected"),n.classList.remove("no-transition")):this._dirtyClassListIterations.add(e)},this)}},canDraw:{value:function(){var e=this.canDrawGate.value;return e=e&&this._requestedIterations<=this._createdIterations,e=e&&(this._initialContentDrawn||this._canDrawInitialContent)}},_boundaries:{value:null},_dirtyClassListIterations:{value:null},_requestedIterations:{value:null},_createdIterations:{value:null},_canDrawInitialContent:{value:null},_initialContentDrawn:{value:null},draw:{value:function(){if(this.canDraw()){this._initialContentDrawn||(this._drawInitialContent(),this._initialContentDrawn=!0);for(var e=this._drawnIterations.length-1;e>=0;e--)null===this._drawnIterations[e].index&&this._drawnIterations[e].retractFromDocument();for(var e=0;this.iterations.length>e;e++){var t=this.iterations[e];t._drawnIndex!==t.index&&t.injectIntoDocument(e)}var n=this._dirtyClassListIterations.toArray();this._dirtyClassListIterations.clear(),n.forEach(function(e){e.forEachElement(function(t){t.component||(t.classList[e.active?"add":"remove"]("active"),t.classList[e.selected?"add":"remove"]("selected"),t.classList.remove("no-transition"))},this)},this)}}},_drawInitialContent:{value:function(){var e=this.element;e.innerHTML="";var t=e.ownerDocument.createTextNode("");e.appendChild(t),this._boundaries.push(t)}},_updateDrawnIndexes:{value:function(e){for(var t=this._drawnIterations;t.length>e;e++)t[e]._drawnIndex=e}},_selectionPointer:{value:null},handleIsSelectionEnabledChange:{value:function(e){e?this._enableSelectionTracking():this._disableSelectionTracking()}},_enableSelectionTracking:{value:function(){this.element.addEventListener("touchstart",this,!0),this.element.addEventListener("mousedown",this,!0)}},_disableSelectionTracking:{value:function(){this.element.removeEventListener("touchstart",this,!0),this.element.removeEventListener("mousedown",this,!0)}},_observeSelectionPointer:{value:function(e){this._selectionPointer=e,this.eventManager.claimPointer(e,this);var t=this.element.ownerDocument;t.addEventListener("touchend",this,!1),t.addEventListener("touchcancel",this,!1),t.addEventListener("mouseup",this,!1)}},_ignoreSelectionPointer:{value:function(){this.eventManager.isPointerClaimedByComponent(this._selectionPointer,this)&&this.eventManager.forfeitPointer(this._selectionPointer,this),this._selectionPointer=null,this.activeIterations.clear();var e=this.element.ownerDocument;e.removeEventListener("touchend",this,!1),e.removeEventListener("touchcancel",this,!1),e.removeEventListener("mouseup",this,!1)}},captureMousedown:{value:function(e){this._observeSelectionPointer("mouse");var t=this._findIterationContainingElement(e.target);t?t.active=!0:this._ignoreSelectionPointer()}},captureTouchstart:{value:function(e){if(null==this._selectionPointer){this._observeSelectionPointer(e.changedTouches[0].identifier);var t=this._findIterationContainingElement(e.target);t?t.active=!0:this._ignoreSelectionPointer()}}},handleTouchend:{value:function(e){for(var t=0;e.changedTouches.length>t&&!this._endSelectionOnTarget(e.changedTouches[t].identifier,e.target);t++);}},handleTouchcancel:{value:function(){this._ignoreSelectionPointer()}},handleMouseup:{value:function(e){this._endSelectionOnTarget("mouse",e.target)}},_endSelectionOnTarget:{value:function(e,t){if(e===this._selectionPointer){if(this.eventManager.isPointerClaimedByComponent(this._selectionPointer,this)){var n=this._findIterationContainingElement(t);n&&(n.active=!1,n.selected||(n.selected=!0))}return this._ignoreSelectionPointer(),!0}}},_findIterationContainingElement:{value:function(e){for(var t;e;){if(e===this.element)return this._iterationForElement.get(t);t=e,e=e.parentNode}}},Iteration:{value:Iteration,serializable:!1}});