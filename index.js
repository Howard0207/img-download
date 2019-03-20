/**
 * 判断当前浏览器是否为IE，若是为IE *？
 */
function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if(isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion == 7) {
            return 7;
        } else if(fIEVersion == 8) {
            return 8;
        } else if(fIEVersion == 9) {
            return 9;
        } else if(fIEVersion == 10) {
            return 10;
        } else {
            return 6;//IE版本<=7
        }   
    } else if(isEdge) {
        return 'edge';//edge
    } else if(isIE11) {
        return 11; //IE11  
    }else{
        return -1;//不是ie浏览器
    }
}

//②IE浏览器图片保存
var SaveAs5 = function(imgURL) {
    var oPop = window.open(imgURL, "", "width=1, height=1, top=5000, left=5000");
    for (; oPop.document.readyState != "complete";) {
        if (oPop.document.readyState == "complete") break;
    }
    oPop.document.execCommand("SaveAs");
    oPop.close();
};

//③下载函数(区分IE和非IE部分)
var oDownLoad = function(url) {
    if (myBrowser() === "IE" || myBrowser() === "Edge") {
        //IE (浏览器)
        SaveAs5(url);
    } else {
        //!IE (非IE)    
        var a = document.createElement('a');            // 创建一个a节点插入的document       
        var event = new MouseEvent('click')             // 模拟鼠标click点击事件 
        a.download = 'codePicture'                    // 设置a节点的download属性值               
        a.href = url;                                   // 将图片的src赋值给a节点的href       
        a.dispatchEvent(event);
       
    }

};


var MIME = {
    "application/x-zip-compressed": "zip",
    "application/javascript": "js",
    "text/css": "css",
    "text/plain": "txt",
    "text/html": "html",
    "text/xml": "xml",
    "image/jpeg": "jpeg",
    "image/png": "png",
    "image/gif": "gif",
    "image/svg+xml": "svg"
};

//文件名默认当前时间戳
function downloadBaseImg(base, name) {
    var fname = name + "." + MIME[getContentType(base)];
    var blob = getBlob(base);

    if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, fname);
    }
    else {
        btnDownload.download = fname;
        btnDownload.href = URL.createObjectURL(blob);
        btnDownload.click();
    }
}

/**
 * 获取Blob
 * @param {stirng} base64
 */
function getBlob(base64) {
    return b64toBlob(getData(base64), getContentType(base64));
}

/**
 * 获取文件类型
 * @param {string} base64
 */
function getContentType(base64) {
    return /data:([^;]*);/i.exec(base64)[1];
}

/**
 * 获取base64中的数据
 * @param {string} base64
 */
function getData(base64) {
    return base64.substr(base64.indexOf("base64,") + 7, base64.length);
}



/**
 * base64转Blob
 * @param {string} b64Data
 * @param {string} contentType
 * @param {number} sliceSize
 */
function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
}