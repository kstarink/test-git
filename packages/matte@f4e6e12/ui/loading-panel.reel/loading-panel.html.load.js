montageDefine("f4e6e12","ui/loading-panel.reel/loading-panel.html",{text:'<!DOCTYPE html>\n<html>\n<head>\n    <meta charset=utf-8>\n    <link rel=stylesheet href=loading-panel.css>\n    <script type=text/montage-serialization>{"owner":{"prototype":"ui/loading-panel.reel","properties":{"element":{"#":"loadingPanel"}}},"loadingIndicator":{"prototype":"ui/progress.reel","properties":{"element":{"#":"loadingIndicator"}},"bindings":{"value":{"<-":"@owner.initializedModuleCount"},"max":{"<-":"@owner.requiredModuleCount"}}},"loadedCount":{"prototype":"montage/ui/text.reel","properties":{"element":{"#":"loadedCount"}},"bindings":{"value":{"<-":"@owner.initializedModuleCount"}}},"requiredCount":{"prototype":"montage/ui/text.reel","properties":{"element":{"#":"requiredCount"}},"bindings":{"value":{"<-":"@owner.requiredModuleCount"}}}}</script>\n</head>\n<body>\n    <div data-montage-id=loadingPanel class=matte-LoadingPanel>\n        <div data-montage-id=loadingIndicator class=matte-LoadingPanel-loadingIndicator></div>\n        <div data-montage-id=loadingCount class=matte-LoadingPanel-loadingCount>\n            <span data-montage-id=loadedCount class=matte-LoadingPanel-loadedCount>0</span>\n            <span class=matte-Loading-divider>/</span>\n            <span data-montage-id=requiredCount class=requiredCount>0</span>\n        </div>\n    </div>\n</body>\n</html>'});