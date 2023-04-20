const socket = io(window.origin);

let id_socket = Date.now().toString();

socket.on("show", function (data){
    if( data["id_socket"] === id_socket ){
        $('#status_'+ data["stt"]).append(data["msg"] +"<br/>");
    }
    return;
});

socket.on("ava", function (data){
    if( data["id_socket"] === id_socket ){
        $('#ava_'+ data["stt"]).html(`<img src="${data["picture"]}" style="width: 44px;border-radius: 13px;" /><br/><br/><a href='https://www.facebook.com/${data["uid_send"]}' target='_bank'>${data["name_send"]}</a>`);
    }
    return;
});

function closeCollapse(name){
    var Collapses = ['showCloneFB','showCloneGG', 'showCloneTW'];
    var runs = Collapses.filter(t => t !== name);
    runs.map(t => {
        $('#'+ t).collapse('hide');
    })
}

function formatNumber(num) {
    try{
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }catch(err){
        return num;
    }
}

function noti_success_left_top(message){
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-left",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "500",
        "timeOut": "1000",
        "extendedTimeOut": "500",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    toastr["success"](message);
}

function noti_success(message){
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    toastr["success"](message);
}

function noti_error(message){
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    toastr["error"](message);
}

function checkInfoSetup(){
    var info_setup = {
        "type_login": $('[name="type_login"]').filter(":checked").map(function () {return this.value;}).get()[0] || "error",
        "thread": parseInt($('#thread').val()) || 1,
        "UAS": $('#UAS').val().toString().trim().split('\n').filter(t => t !== "") || [],
        "site_login": $('[name="site_login"]').filter(":checked").map(function () {return this.value;}).get()[0] || "error",
        "type_reset": $('[name="type_reset"]').filter(":checked").map(function () {return this.value;}).get()[0] || "error",
        "xproxy": {
            "endpoint": $('#xproxy_endpoint').val() || "error",
            "ports": $('#xproxy_ports').val().toString().split('\n').filter(t => t !== "") || [],
            "random_proxy": $('#random_xproxy').is(":checked")
        },
        "shadow": {
            "endpoint": $('#shadow_endpoint').val() || "error",
            "ports": $('#shadow_ports').val().toString().split('\n').filter(t => t !== "") || [],
            "random_proxy": $('#random_shadow').is(":checked")
        },
        "xproxy_lan": {
            "endpoint": $('#xproxylan_endpoint').val() || "error",
            "ports": $('#xproxylan_ports').val().toString().split('\n').filter(t => t !== "") || [],
            "random_xproxylan": $('#random_xproxylan').is(":checked")
        },
        "rasdial": $('#rasdial').val() || "error",
        "911": {
            "folder": $('#911_folder').val() || "error",
            "country": $('#911_country').val().toLocaleUpperCase() || "VN",
            "port": $('#911_port').val() || 0,
            "head_ip": $('#911_head_ip').val() || "*",
        },
        "oxylab": {
            "endpoint": $('#oxylab_endpoint').val() || "pr.oxylabs.io:7777",
            "country": $('#oxylab_country').val().toString().toLocaleUpperCase() || "vn",
            "time_limit": $('#oxylab_time_limit').val().toString().toLocaleLowerCase() || "5",
            "username": $('#oxylab_username').val() || "user",
            "password": $('#oxylab_password').val() || "pass",
        },
        "pyproxy": {
            "endpoint": $('#pyproxy_endpoint').val() || "pr.oxylabs.io",
            "port": $('#pyproxy_port').val().toString().toLocaleUpperCase() || "7777",
            "country": $('#pyproxy_country').val().toString().toLocaleUpperCase() || "vn",
            "time_limit": $('#pyproxy_time_limit').val().toString().toLocaleLowerCase() || "5",
            "username": $('#pyproxy_username').val() || "user",
            "password": $('#pyproxy_password').val() || "pass",
        },
        "brightdata": {
            "endpoint": $('#brightdata_endpoint').val() || "pr.oxylabs.io:7777",
            "country": $('#brightdata_country').val().toString().toLocaleUpperCase() || "vn",
            "username": $('#brightdata_username').val() || "user",
            "password": $('#brightdata_password').val() || "pass",
        },
        "oxylab_thue": {
            "accounts": $('#accounts_oxylab').val().toString().split('\n').filter(t => t !== "") || [],
            "endpoint": $('#oxylab_thue_endpoint').val() || "pr.oxylabs.io:7777"
        },
        "pia": {
            "countrys": $('#pia_countrys').val().toString().split('\n').filter(t => t !== "") || [],
        },
        "browsec": {
            "countrys": $('#browsec_countrys').val().toString().split('\n').filter(t => t !== "") || [],
        },
        "limit_account_reset": $('#limit_account_reset').val() || 1,
        "time_wait_reset": $('#time_wait_reset').val() || 5,
    }

    var check_1 = [info_setup["type_login"], info_setup["site_login"], info_setup["type_reset"]].filter(t => t === "error");
    if( check_1.length > 0 ){
        return {
            status: "error",
            message: "Vui lòng kiểm tra lại thông tin nhập [info_setup]"
        }
    }
    if( info_setup["type_reset"] === "911" && (info_setup["911"]["country"].length < 2 || info_setup["911"]["port"] === 0 )){
        return {
            status: "error",
            message: "Có vẻ bạn chưa nhập sai dữ liệu 911"
        };
    };
    if( info_setup["type_reset"] === "oxylab_thue" && (info_setup["oxylab_thue"]["accounts"] === "error" || info_setup["oxylab_thue"]["accounts"].length < 1 )){
        return {
            status: "error",
            message: "Có vẻ bạn chưa nhập username:password oxylab thuê"
        };
    };
    if( info_setup["type_reset"] === "dcom" && info_setup["rasdial"] === "error" ){
        return {
            status: "error",
            message: "Có vẻ bạn chưa nhập dòng lệnh rasdial"
        };
    }
    if( info_setup["type_reset"] === "xproxy" && info_setup["xproxy"]["endpoint"] === "error" ){
        return {
            status: "error",
            message: "Bạn chưa nhập endpoint xproxy"
        };
    }
    if( info_setup["type_reset"] === "xproxy" && info_setup["xproxy"]["ports"]["length"] < 1 ){
        return {
            status: "error",
            message: "Bạn chưa nhập ports xproxy"
        };
    }
    if( info_setup["type_reset"] === "xproxy_lan" && info_setup["xproxy_lan"]["endpoint"] === "error" ){
        return {
            status: "error",
            message: "Bạn chưa nhập endpoint xproxy_lan"
        };
    }
    if( info_setup["type_reset"] === "xproxy_lan" && info_setup["xproxy_lan"]["ports"]["length"] < 1 ){
        return {
            status: "error",
            message: "Bạn chưa nhập ports xproxy_lan"
        };
    }
    if( info_setup["type_reset"] === "911" && info_setup["911"]["country"] === "error" ){
        return {
            status: "error",
            message: "Bạn chưa nhập country cho 911"
        };
    }
    if( info_setup["type_reset"] === "911" && info_setup["911"]["port"] === "error" ){
        return {
            status: "error",
            message: "Bạn chưa nhập port cho 911"
        };
    }
    return {
        status: "success",
        message: "Kiểm tra info_setup thành công!",
        info_setup
    }
}

function checkInfoSpam(){
    var info_spam = {
        "load_link_child": $('[name="load_link_child"]').is(":checked"),
        "random_path": $('[name="random_path"]').is(":checked"),
        "sub_domain": $('[name="sub_domain"]').is(":checked"),
        "accounts": $('#accounts_spam').val().toString().split('\n').filter(t => t !== "") || [],
        "contents": $('#contents_spam').val().toString().split('\n').filter(t => t !== "") || [],
        "contents_owner": $('#contents_owner').val().toString().split('\n').filter(t => t !== "") || [],
        "paths": $('#paths_spam').val().toString().split('\n').filter(t => t !== "") || [],
        "domains": $('#domains_spam').val().toString().split('\n').filter(t => t !== "") || [],
        "type_spam": $('[name="type_spam"]').filter(":checked").map(function () {return this.value;}).get()[0] || "error",
        "type_bypass": $('[name="type_bypass"]').filter(":checked").map(function () {return this.value;}).get()[0] || "error",
        "type_protocal": $('[name="type_protocal"]').filter(":checked").map(function () {return this.value;}).get()[0] || "error",
        "type_friend": $('[name="type_friend"]').filter(":checked").map(function () {return this.value;}).get()[0] || "error",
        "turn_off_noti": $('#turn_off_noti').is(":checked"),
        "comment_late": $('#comment_late').is(":checked"),
        "like_late": $('#like_late').is(":checked"),
        "edit_link_with_cookie": $('#edit_link_with_cookie').is(":checked"),
        "hide_post_ver_2": $('#hide_post_ver_2').is(":checked"),
        "test_link": $('[name="test_link"]').is(":checked"),
        "filter_database": $('#filter_database').is(":checked"),
        "type_request": $('[name="type_request"]').filter(":checked").map(function () {return this.value;}).get()[0] || "basic",
        "type_token": $('[name="type_token"]').filter(":checked").map(function () {return this.value;}).get()[0] || "EAAG",
        "useChromeSpam": $('#useChromeSpam').is(":checked"),
        "message_comment": $('#message_comment').val() || ".",
        "endpoint_server": $('#endpoint_server').val() || "error",
        "min_friend": $('#min_friend').val() || 0,
        "max_year": $('#max_year').val() || 2022,
        "limit_friend": $('#limit_friend').val() || 1,
        "friend_tag_per_post": $('#friend_tag_per_post').val() || 1,
        "limit_link_child": parseInt($('#limit_link_child').val()) || 1,
        "country_filter_group": $('#country_filter_group').val() || "PH",
    };

    var check_1 = [info_spam["type_spam"], info_spam["type_friend"]].filter(t => t === "error");
    if( check_1.length > 0 ){
        return {
            status: "error",
            message: "Vui lòng kiểm tra lại thông tin nhập [info_spam]"
        }
    }
    if( info_spam["accounts"].length < 1 || info_spam["contents"].length < 1 || info_spam["domains"].length < 1  ){
        return {
            status: "error",
            message: "Có vẻ bạn chưa nhập content hoặc domain"
        };
    }
    if( (info_spam["limit_friend"] / friend_tag_per_post) > 70 ){
        return {
            status: "error",
            message: "Bạn chưa nhập limit_friend và friend_tag_per_post không hợp lệ"
        };
    }
    return {
        status: "success",
        message: "Kiểm tra info_setup thành công!",
        info_spam
    }
}

async function pauseSpamChild(){
    $('#btnPauseSpam').html("Đang ngưng spam...");
    window.STOP = "true";
};
async function startSpamChild(){
    window.SPAM = "false";
    $('#btnStartSpam').attr('disabled', true);
    var status_check = await checkInfoSetup();
    if( status_check["status"] !== "success" ){
        noti_error(status_check["message"]);
        $('#btnStartSpam').attr('disabled', false);
        return;
    }
    noti_success("Kiểm tra setup thành công!");
    var status_check2 = await checkInfoSpam();
    if( status_check2["status"] !== "success" ){
        noti_error(status_check2["message"]);
        $('#btnStartSpam').attr('disabled', false);
        return;
    }
    console.log(status_check, status_check2)
    noti_success("Kiểm tra setup spam thành công!");

    var kq = await ky.post("/SaveSetting", {
        "timeout": 30e3,
        "retry": {
            "limit": 0
        },
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9,vi;q=0.8",
            "content-type": "application/x-www-form-urlencoded",
        },
        "throwHttpErrors": true,
        "body": new URLSearchParams({
            tool: 'spam_tag',
            info_setup: JSON.stringify(status_check["info_setup"]),
            info_spam: JSON.stringify(status_check2["info_spam"])
        }).toString(),
        "referrerPolicy": "origin-when-cross-origin",
        "mode": "cors",
        "credentials": "include"
    }).then(async function(aaa) {
        var data = await aaa.json();
        return data;
    }).catch(err => {
        return {
            status: "error",
            message: "Server lỗi, tạm thời không nhận được kết quả đăng nhập từ server."
        };
    });
    startSpam(status_check["info_setup"], status_check2["info_spam"], 'start');
}
























function waitBaby(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), time);
        return;
    })
}

$(document).ready(function() {
    $("#btn-login").click(async function(){
        $('#login-alert').css('display', 'none');
        $(this).attr('disabled', true).text('Đang đăng nhập...');
        await waitBaby(1e3);
        var info = await Login();
        if( info["status"] === "error" ){
            $('#login-alert').css('display', '').html(info["message"]);
            $(this).attr('disabled', false).text('Đăng nhập');
            return;
        };
        $(this).attr('disabled', true).text('Đăng nhập thành công...');
        $('#login-alert').removeClass('alert-danger').addClass('alert-success').css('display', '').html(info["message"]);
        await waitBaby(1e3);
        window.location.reload();
    });
    $("#btnBuyAccount").click(async function(){
        $('#buy-alert').css('display', 'none');
        $(this).attr('disabled', true).text('Đang mua hàng...');
        await waitBaby(1e3);
        var info = await BuyAccount();
        console.log(121, info)
        if( info["status"] === "error" ){
            $('#buy-alert').css('display', '').html(info["message"]);
            $(this).attr('disabled', false).text('Mua hàng');
            return;
        };
        $(this).attr('disabled', false).text('Mua hàng');
        $('#buy-alert').removeClass('alert-danger').addClass('alert-success').css('display', '').html(info["message"]);
        await waitBaby(2e3);
        window.location.replace('./bill-order');
    });
});

async function BuyAccount(){
    try{
        var id_group = parseInt($('#typeAccount').val());
        var quantity = parseInt($('#quantity').val());
        if( id_group < 0 || quantity < 0 ){
            return {
                status: 'error',
                message: 'Có vẻ loại tài khoản và số lượng mua của bạn không phù hợp!'
            };
        }
        var kq = await ky.post("/BuyAccount", {
            "timeout": 30e3,
            "retry": {
                "limit": 0
            },
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9,vi;q=0.8",
                "content-type": "application/x-www-form-urlencoded",
            },
            "throwHttpErrors": true,
            "body": new URLSearchParams({id_group, quantity}).toString(),
            "referrerPolicy": "origin-when-cross-origin",
            "mode": "cors",
            "credentials": "include"
        }).then(async function(aaa) {
            var data = await aaa.json();
            return data;
        }).catch(err => {
            return {
                status: "error",
                message: "Server lỗi, tạm thời không nhận được kết quả đăng nhập từ server."
            };
        });
        return kq;
    }catch(err){
        return {
            status: 'error',
            message: 'Có vẻ loại tài khoản và số lượng mua của bạn không phù hợp!'
        };
    }
}

window.onload = function(){
    if( localStorage["save_login"] === "true" ){
        if( $('#login-remember').length > 0 ){
            $('#login-remember').click();
        }
    }
    if( !localStorage["save_login"] || localStorage["save_login"] === "false" ){
        localStorage["save_login"] = false;
    }else{
        if( $('#login-phone').length > 0 ){
            $('#login-phone').val(localStorage["phone"]);
        }
        if( $('#login-password').length > 0 ){
            $('#login-password').val(localStorage["password"]);
        }
    }
}

const globals={},getGlobal=t=>"undefined"!=typeof self&&self&&t in self?self:"undefined"!=typeof window&&window&&t in window?window:"undefined"!=typeof global&&global&&t in global?global:"undefined"!=typeof globalThis&&globalThis?globalThis:void 0,globalProperties=["Headers","Request","Response","ReadableStream","fetch","AbortController","FormData"];for(const t of globalProperties)Object.defineProperty(globals,t,{get(){const e=getGlobal(t),s=e&&e[t];return"function"==typeof s?s.bind(e):s}});const isObject=t=>null!==t&&"object"==typeof t,supportsAbortController="function"==typeof globals.AbortController,supportsStreams="function"==typeof globals.ReadableStream,supportsFormData="function"==typeof globals.FormData,mergeHeaders=(t,e)=>{const s=new globals.Headers(t),r=e instanceof globals.Headers,o=new globals.Headers(e);for(const[t,e]of o)r&&"undefined"===e||void 0===e?s.delete(t):s.set(t,e);return s},deepMerge=(...t)=>{let e={},s={};for(const r of t){if(Array.isArray(r))Array.isArray(e)||(e=[]),e=[...e,...r];else if(isObject(r)){for(let[t,s]of Object.entries(r))isObject(s)&&Reflect.has(e,t)&&(s=deepMerge(e[t],s)),e={...e,[t]:s};isObject(r.headers)&&(s=mergeHeaders(s,r.headers))}e.headers=s}return e},requestMethods=["get","post","put","patch","head","delete"],responseTypes={json:"application/json",text:"text/*",formData:"multipart/form-data",arrayBuffer:"*/*",blob:"*/*"},retryMethods=["get","put","head","delete","options","trace"],retryStatusCodes=[408,413,429,500,502,503,504],retryAfterStatusCodes=[413,429,503],stop=Symbol("stop");class HTTPError extends Error{constructor(t){super(t.statusText||String(0===t.status||t.status?t.status:"Unknown response error")),this.name="HTTPError",this.response=t}}class TimeoutError extends Error{constructor(){super("Request timed out"),this.name="TimeoutError"}}const delay=t=>new Promise(e=>setTimeout(e,t)),timeout=(t,e,s)=>new Promise((r,o)=>{const n=setTimeout(()=>{s&&s.abort(),o(new TimeoutError)},e);t.then(r).catch(o).then(()=>{clearTimeout(n)})}),normalizeRequestMethod=t=>requestMethods.includes(t)?t.toUpperCase():t,defaultRetryOptions={limit:2,methods:retryMethods,statusCodes:retryStatusCodes,afterStatusCodes:retryAfterStatusCodes},normalizeRetryOptions=(t={})=>{if("number"==typeof t)return{...defaultRetryOptions,limit:t};if(t.methods&&!Array.isArray(t.methods))throw new Error("retry.methods must be an array");if(t.statusCodes&&!Array.isArray(t.statusCodes))throw new Error("retry.statusCodes must be an array");return{...defaultRetryOptions,...t,afterStatusCodes:retryAfterStatusCodes}},maxSafeTimeout=2147483647;class Ky{constructor(t,e={}){if(this._retryCount=0,this._input=t,this._options={credentials:this._input.credentials||"same-origin",...e,headers:mergeHeaders(this._input.headers,e.headers),hooks:deepMerge({beforeRequest:[],beforeRetry:[],afterResponse:[]},e.hooks),method:normalizeRequestMethod(e.method||this._input.method),prefixUrl:String(e.prefixUrl||""),retry:normalizeRetryOptions(e.retry),throwHttpErrors:!1!==e.throwHttpErrors,timeout:void 0===e.timeout?1e4:e.timeout},"string"!=typeof this._input&&!(this._input instanceof URL||this._input instanceof globals.Request))throw new TypeError("`input` must be a string, URL, or Request");if(this._options.prefixUrl&&"string"==typeof this._input){if(this._input.startsWith("/"))throw new Error("`input` must not begin with a slash when using `prefixUrl`");this._options.prefixUrl.endsWith("/")||(this._options.prefixUrl+="/"),this._input=this._options.prefixUrl+this._input}if(supportsAbortController&&(this.abortController=new globals.AbortController,this._options.signal&&this._options.signal.addEventListener("abort",()=>{this.abortController.abort()}),this._options.signal=this.abortController.signal),this.request=new globals.Request(this._input,this._options),this._options.searchParams){const t=new URL(this.request.url);t.search=new URLSearchParams(this._options.searchParams),!(supportsFormData&&this._options.body instanceof globals.FormData||this._options.body instanceof URLSearchParams)||this._options.headers&&this._options.headers["content-type"]||this.request.headers.delete("content-type"),this.request=new globals.Request(new globals.Request(t,this.request),this._options)}void 0!==this._options.json&&(this._options.body=JSON.stringify(this._options.json),this.request.headers.set("content-type","application/json"),this.request=new globals.Request(this.request,{body:this._options.body}));const s=async()=>{if(this._options.timeout>maxSafeTimeout)throw new RangeError(`The \`timeout\` option cannot be greater than ${maxSafeTimeout}`);await delay(1);let t=await this._fetch();for(const e of this._options.hooks.afterResponse){const s=await e(this.request,this._options,t.clone());s instanceof globals.Response&&(t=s)}if(!t.ok&&this._options.throwHttpErrors)throw new HTTPError(t);if(this._options.onDownloadProgress){if("function"!=typeof this._options.onDownloadProgress)throw new TypeError("The `onDownloadProgress` option must be a function");if(!supportsStreams)throw new Error("Streams are not supported in your environment. `ReadableStream` is missing.");return this._stream(t.clone(),this._options.onDownloadProgress)}return t},r=this._options.retry.methods.includes(this.request.method.toLowerCase())?this._retry(s):s();for(const[t,e]of Object.entries(responseTypes))r[t]=(async()=>{this.request.headers.set("accept",this.request.headers.get("accept")||e);const s=(await r).clone();return"json"===t&&204===s.status?"":s[t]()});return r}_calculateRetryDelay(t){if(this._retryCount++,this._retryCount<this._options.retry.limit&&!(t instanceof TimeoutError)){if(t instanceof HTTPError){if(!this._options.retry.statusCodes.includes(t.response.status))return 0;const e=t.response.headers.get("Retry-After");if(e&&this._options.retry.afterStatusCodes.includes(t.response.status)){let t=Number(e);return Number.isNaN(t)?t=Date.parse(e)-Date.now():t*=1e3,void 0!==this._options.retry.maxRetryAfter&&t>this._options.retry.maxRetryAfter?0:t}if(413===t.response.status)return 0}return.3*2**(this._retryCount-1)*1e3}return 0}async _retry(t){try{return await t()}catch(e){const s=Math.min(this._calculateRetryDelay(e),maxSafeTimeout);if(0!==s&&this._retryCount>0){await delay(s);for(const t of this._options.hooks.beforeRetry){if(await t({request:this.request,options:this._options,error:e,response:e.response.clone(),retryCount:this._retryCount})===stop)return}return this._retry(t)}if(this._options.throwHttpErrors)throw e}}async _fetch(){for(const t of this._options.hooks.beforeRequest){const e=await t(this.request,this._options);if(e instanceof Request){this.request=e;break}if(e instanceof Response)return e}return!1===this._options.timeout?globals.fetch(this.request.clone()):timeout(globals.fetch(this.request.clone()),this._options.timeout,this.abortController)}_stream(t,e){const s=Number(t.headers.get("content-length"))||0;let r=0;return new globals.Response(new globals.ReadableStream({start(o){const n=t.body.getReader();e&&e({percent:0,transferredBytes:0,totalBytes:s},new Uint8Array),async function t(){const{done:i,value:a}=await n.read();i?o.close():(e&&(r+=a.byteLength,e({percent:0===s?0:r/s,transferredBytes:r,totalBytes:s},a)),o.enqueue(a),t())}()}}))}}const validateAndMerge=(...t)=>{for(const e of t)if((!isObject(e)||Array.isArray(e))&&void 0!==e)throw new TypeError("The `options` argument must be an object");return deepMerge({},...t)},createInstance=t=>{const e=(e,s)=>new Ky(e,validateAndMerge(t,s));for(const s of requestMethods)e[s]=((e,r)=>new Ky(e,validateAndMerge(t,r,{method:s})));return e.HTTPError=HTTPError,e.TimeoutError=TimeoutError,e.create=(t=>createInstance(validateAndMerge(t))),e.extend=(e=>createInstance(validateAndMerge(t,e))),e.stop=stop,e};
window.ky = createInstance()