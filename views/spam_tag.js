let CACHE_POST = {};
let POST_GOC = [];

var stt = 0;
let groupx = "";


$(document).ready(function() {
    setTimeout(() => {
        $('#btnStartSpam').attr('disabled', false);
    }, 1e3);
});

function resetIp(info_setup){
    return new Promise(resolve => {
        ky.post("/resetIp", {
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
            "body": new URLSearchParams({info_setup: JSON.stringify(info_setup)}).toString(),
            "referrerPolicy": "origin-when-cross-origin",
            "mode": "cors",
            "credentials": "include"
        }).then(async function(aaa) {
            var data = await aaa.json();
            return resolve(data);
        }).catch(err => {
            return resolve({
                status: "error",
                again: true,
                message: "Server lỗi, quá trình resetIp không hoạt động."
            });
        });
    })
}

async function checkAllPostGoc(){
    $('#count_live_post_goc').text('0');
    $('#count_del_post_goc').text('0');
    $('#count_die_post_goc').text('0');
    $('#count_kxd_post_goc').text('0');
    $('#show_post_goc').html('');
    // $('#modal-show-account').modal('show');
    if( POST_GOC.length < 1 ){
        noti_error("Bạn không có post gốc nào!");
        return;
    }
    $('#modal-show-post-goc').modal('show');
    var kq = await ky.post("/checkPostChildGoc", {
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
            posts: JSON.stringify(POST_GOC)
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
        };
    });
    if( kq["status"] === "error" ){
        noti_error("Check post gốc fail");
        $('#modal-show-post-goc').modal('hide');
        return;
    }
    let checks = kq["checks"];
    
    checks.map(t => {
        let color;
        switch(t["status"]) {
            case "LIVE":
              color="green";
              break;
            case "DEL_LINK":
                color="orange";
                break;
            case "DIE":
                color= "red";
              break;
            default:
                color= "";
        };
        $('#'+ t["post"]).css("color", color);
        return;
    })

    let count_ok = checks.filter(t => t["status"] === "LIVE").length;
    let count_del = checks.filter(t => t["status"] === "DEL_LINK").length;
    let count_die = checks.filter(t => t["status"] === "DIE").length;
    let count_kxd = checks.filter(t => t["status"] === "KXD").length;
    $('#count_live_post_goc').html(count_ok);
    $('#count_del_post_goc').html(count_del);
    $('#count_die_post_goc').html(count_die);
    $('#count_kxd_post_goc').html(count_kxd);
}

function showAccountSpam(accounts_spam){
    var cc = accounts_spam.map(account => {
        let key_agent = Math.random().toString(32).slice(-8);
        ++stt;
        return {
            id: key_agent,
            stt,
            key_agent,
            full: account
        }
    }).reverse();
    
    var html_show = cc.map(t => {
        CACHE_POST[t["id"]] = {
            stt: t["stt"]
        };
        return `<tr id="tr_${t["id"]}">
                    <td style="text-align: center;vertical-align: middle;">
                        ${t["stt"]}
                    </td>
                    <td style="text-align: center;vertical-align: middle;">
                        ${ new Date(Date.now()).toLocaleString() }<br/><br/>
                        <input class="form-control" value="${t["full"]}" /><br/>
                    </td>
                    <td style="text-align: center;vertical-align: middle;">
                        <div id="ava_${t["stt"]}"></div>
                    </td>
                    <td style="text-align: left;vertical-align: middle;" id="status_${t["stt"]}"></td>
                    <td style="text-align: center;vertical-align: middle;" id="friends_${t["stt"]}"></td>
                    <td style="text-align: center;vertical-align: middle;" id="process_spam_${t["stt"]}">
                        <img style="width: 120px" src="https://64.media.tumblr.com/578d2dd48a0a53e54e7e05de6043155c/tumblr_nrlr6tulGV1r2geqjo1_540.gif" />
                    </td>
                </tr>   `
    }).join('');
    $('#show_account_spam').prepend(html_show);
    return cc;
}

function xulyAccount(accounts_spam2, type_login){
    var cc = [];
    for(account of accounts_spam2){
        cc.push(xulyAccount2(account, type_login))
    }
    return Promise.all(cc);
}

function xulyAccount2(account, type_login){
    return new Promise(resolve => {
        if(type_login === "token"){
            var check = account["full"].slice(0,4);
            account["ok"] = (check === "EAAG");
            account["token"] = account["full"];
            return resolve(account);
        }
        if( type_login === "edit_cookie" || type_login === "cookie" || type_login === "cookie2" || type_login === "cookie_relogin" ){
            try{
                var check = account["full"].split('|');
                var cookie = check.filter(t => t.includes('c_user='))[0];
                var [u,p,c,c2fa] = check;
				if( c2fa ){
					account["code2fa"] = c2fa;
				}
                account["cookie"] = cookie;
                account["ok"] = true;
                return resolve(account);
            }catch(err){
                console.log(err);
                account["ok"] = false;
                return resolve(account);
            }
        }
        if( type_login === "user_pass" ){
            try{
                var check = account["full"].split('|');
                var check_cookie = check.filter(t => t.includes('c_user='));
                var cookie = ((check_cookie.length === 0) ? false : check_cookie[0]);
                console.log('cookie', cookie);
                var [user, password] = check;
                var code2fa = check[3];
                account["user"] = user;
                account["cookie"] = cookie;
                account["password"] = password;
                account["code2fa"] = code2fa;
                account["ok"] = true;
                return resolve(account);
            }catch(err){
                console.log(err);
                account["ok"] = false;
                return resolve(account);
            }
        }
    })
}

function Login(accounts, info_setup, info_spam){
    console.log(accounts, info_setup)
    return new Promise(resolve => {
        ky.post("/Login", {
            "timeout": 300e3,
            "retry": {
                "limit": 0
            },
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9,vi;q=0.8",
                "content-type": "application/x-www-form-urlencoded",
            },
            "throwHttpErrors": true,
            "body": new URLSearchParams({id_socket, accounts: JSON.stringify(accounts), info_setup: JSON.stringify(info_setup), info_spam: JSON.stringify(info_spam), groupx}).toString(),
            "referrerPolicy": "origin-when-cross-origin",
            "mode": "cors",
            "credentials": "include"
        }).then(async function(aaa) {
            var data = await aaa.json();
            return resolve(data);
        }).catch(err => {
            return resolve({
                status: "error",
                again: true,
                message: "Server lỗi, quá trình Login không hoạt động."
            });
        });
    })
}

function childSPAM(accounts, info_spam, info_setup){
    return new Promise(resolve => {
        ky.post("/Spam", {
            "timeout": 300e3,
            "retry": {
                "limit": 0
            },
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9,vi;q=0.8",
                "content-type": "application/x-www-form-urlencoded",
            },
            "throwHttpErrors": true,
            "body": new URLSearchParams({accounts: JSON.stringify(accounts), info_spam: JSON.stringify(info_spam), info_setup: JSON.stringify(info_setup)}).toString(),
            "referrerPolicy": "origin-when-cross-origin",
            "mode": "cors",
            "credentials": "include"
        }).then(async function(aaa) {
            var data = await aaa.json();
            return resolve(data);
        }).catch(err => {
            return resolve({
                status: "error",
                again: true,
                message: "Server lỗi, quá trình Spam không hoạt động."
            });
        });
    })
}

async function startSpam(info_setup, info_spam, start){
    $('#btnPauseSpam').attr('disabled', false);
    if( window.STOP === "true" ){
        $('#btnStartSpam').attr('disabled', false);
        noti_success("Đã có lệnh dừng lại!");
        $('#btnPauseSpam').attr('disabled', true).html("Dừng lại");
        return;
    };

    if( start ){
        groupx = Math.random().toString(32).slice(-8);
    };

    if( start || !window.dem_account ){
        console.log('reset 1');
        noti_success("Bắt đầu spam");
        window.dem_account = 1;
        let status_resetIP = await resetIp(info_setup);
        await waitBaby(info_setup["time_wait_reset"] * 1e3);
    } else if( (parseInt(window.dem_account) + 1) > info_setup["limit_account_reset"] || parseInt(window.dem_account) > info_setup["limit_account_reset"] ){
        window.dem_account = 1;
        let status_resetIP = await resetIp(info_setup);
        await waitBaby(info_setup["time_wait_reset"] * 1e3);
    }else{
        window.dem_account = parseInt(window.dem_account) + info_setup["thread"];
    }
    
    let accounts = info_spam["accounts"];
    if( accounts.length < 1 ){
        noti_success("Đã spam xong hết account");
        $('#btnStartSpam').attr('disabled', false);
        $('#btnPauseSpam').attr('disabled', true).html("Dừng lại");
        return;
    }

    let accounts_spam = accounts.slice(0, info_setup["thread"]);
    let accounts_left = accounts.slice(info_setup["thread"]);
    info_spam["accounts"] = accounts_left;
    let account_show_left = accounts_left.join('\n');
    $('#accounts_spam').val(account_show_left);
    let accounts_spam2 = await showAccountSpam(accounts_spam);
    let accounts_spam3 = await xulyAccount(accounts_spam2, info_setup["type_login"]);
    let accounts_ok = accounts_spam3.filter(t => t["ok"]);
    let accounts_fail = accounts_spam3.filter(t => !t["ok"]);
    accounts_fail.map(account => {
        $('#process_spam_'+ account["stt"]).html("Định dạng sai");
        document.getElementById('accounts_fail').value += account["full"] +"|Đinh dạng sai" + "\n";
        $('#tr_'+ account["id"]).data("spam", "fail");
    });
    if( accounts_ok.length === 0 ){
        setTimeout(() => startSpam(info_setup, info_spam), 2e3);
        return;
    }
    var status_login = await Login(accounts_ok, info_setup, info_spam);
    if( status_login["status"] === "error"){
        accounts_ok.map(info => {
            $('#process_spam_'+ info["stt"]).html(status_login["message"]);
            document.getElementById('accounts_fail').value += info["full"] +"|"+ status_login["message"] + "\n";
            $('#tr_'+ info["id"]).data("spam", "fail");
        });
        noti_error(status_login["message"]);
        setTimeout(() => startSpam(info_setup, info_spam), 2e3);
        return;
    }
    var Logins = status_login["Logins"];
    // console.log('Logins', Logins);
    let accounts_fail2 = Logins.filter(t => t["status"] !== "success" || !t["friends"]);
    accounts_fail2.map(info => {
		var msg = info["message"] || "KXD";
        $('#process_spam_'+ info["account"]["stt"]).html(msg);
        $('#tr_'+ info["id"]).data("spam", "fail");
        if( info["again"] ){
            document.getElementById('accounts_again').value += info["account"]["full"] +"|"+ msg + "\n";
        }else{
            document.getElementById('accounts_fail').value += info["account"]["full"] +"|"+ msg + "\n";
        }
    });
    Logins.map(info => {
        $('#status_'+ info["account"]["stt"]).append(info["message"]);
        if( info["friends"] ){
            $('#friends_'+ info["account"]["stt"]).html(`${info["friends"]["length"]}`);
        }
        if( info["friends"] && info["friends"]["length"] === 0 ){
            $('#process_spam_'+ info["account"]["stt"]).html("Lỗi: Friends không đủ điều kiện");
            $('#tr_'+ info["account"]["id"]).data("spam", "fail");
        }
    });

    let accounts_ok2 = Logins.filter(t => t["status"] === "success" && !!t["friends"]);
    if( accounts_ok2.length < 1 ){
        setTimeout(() => startSpam(info_setup, info_spam), 2e3);
        return;
    }
    var accounts_ok3 = accounts_ok2.filter(t => t["friends"]["length"] > 0);
    if( accounts_ok3.length < 1 ){
        setTimeout(() => startSpam(info_setup, info_spam), 2e3);
        return;
    }

    if( info_spam["useChromeSpam"] ){
        var status_spams = {
            status: "success",
            SPAMS: accounts_ok3.map(t => JSON.parse(t["status_spam"]))
        }
    }else{
        var status_spams = await childSPAM(accounts_ok3, info_spam, info_setup);
    }
    
    
    console.log('status_spams', status_spams);
    if( status_spams["status"] === "error"){
        accounts_ok3.map(info => {
            $('#process_spam_'+ info["stt"]).html(status_spams["message"]);
            $('#tr_'+ info["id"]).data("spam", "fail");
            // document.getElementById('accounts_ok').value += info["full"] +"|" + tatus_spams["message"] + "\n";
            if( status_spams["again"] ){
                document.getElementById('accounts_again').value += info["account"]["full"] +"|"+ status_spams["message"] + "\n";
            }else{
                document.getElementById('accounts_fail').value += info["account"]["full"] +"|"+ status_spams["message"] + "\n";
            }
        });
        noti_error(status_spams["message"]);
        setTimeout(() => startSpam(info_setup, info_spam), 2e3);
        return;
    }
    var SPAMS = status_spams["SPAMS"];
    var SPAMS_FAIL = SPAMS.filter(t => t["status"] !== "success");
    SPAMS_FAIL.map(info => {
        $('#process_spam_'+ info["account"]["stt"]).html(info["message"]);
        $('#tr_'+ info["account"]["id"]).data("spam", "fail");
        if( info["again"] ){
            document.getElementById('accounts_again').value += info["account"]["full"] +"|"+ info["message"] + "\n";
        }else{
            document.getElementById('accounts_fail').value += info["account"]["full"] +"|"+ info["message"] + "\n";
        }
    });
    var SPAMS_OK = SPAMS.filter(t => t["status"] === "success");
    SPAMS_OK.map(info => {
        POST_GOC.push(info["post_id"]);
        document.getElementById('accounts_ok').value += info["account"]["full"] + "\n";
        $('#status_'+ info["account"]["stt"]).html(info["message"]);
        let posts = info["tags"];
        let posts_dau_child = "xxx"+ info["post_id"];
        let posts_dau = [posts_dau_child];
        CACHE_POST[info["account"]["id"]]["uid"] = info["uid"] +"_"+ info["id"];
        CACHE_POST[info["account"]["id"]]["post"] = info["post_id"];
        posts = posts_dau.concat(posts);
        var html_child = `<a id="${info["post_id"]}" href="https://fb.com/${info["post_id"]}" target="_bank">Post gốc: ${info["post_id"]}</a><br/>` + info["tags"].slice(0,5).map(t => {
            return `<a href="https://fb.com/${t}" target="_bank">${info["uid"]}_${t}</a><br/>`
        }).join('');
        let id_textarea = Math.random().toString(32).slice(-8);
        let html_textarea = `<textarea id="textarea_${id_textarea}" style="display:none;">${posts.join('\n')}</textarea>
        <br/>
        <button class="btn btn-primary" onclick="checkOnePostSpam('${id_textarea}');" style="width: 100%;">Check ${posts.length} post</button>
        `;
        $('#process_spam_'+ info["account"]["stt"]).html(`Posted: ${info["tags"]["length"]} post!<br/>Link: <a href="${info["link"]}" target="_bank">${info["link"]}</a><hr/>${html_child + html_textarea}`);
    });
    setTimeout(() => startSpam(info_setup, info_spam), 2e3);
    return;
}

async function clear_account_spam_fail(){
    [...$('tr')].map(e => {
        if( $(e).data('spam') === "fail" ){
            $(e).remove();
        }
    });
}

async function checkAllPost(){
    $('#count_live_account').text('0');
    $('#count_die_account').text('0');
    $('#count_kxd_account').text('0');
    $('#modal-show-account').modal('show');

    let infos = Object.keys(CACHE_POST);
    infos = infos.filter(t => CACHE_POST[t]["uid"]).map(t => {
        let i = CACHE_POST[t];
        i["key"] = t;
        $('#tr_'+ t).css("background-color", "white");
        return i;
    });
    let profiles = infos.map(t => t["uid"]);
    var kq = await ky.post("/checkAllProfile", {
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
            profiles: JSON.stringify(profiles)
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
        };
    });
    if( kq["status"] === "error" ){
        noti_error("Check profiles fail");
        $('#modal-show-account').modal('hide');
        return;
    }
    let checks = kq["checks"];
    checks.map(t => {
        let color;
        switch(t["status"]) {
            case "LIVE":
              color= "#00f3ff";
              break;
            case "DIE":
                color= "#ffeb00";
              break;
            default:
                color= "";
        };
        let id_tr = infos.filter(i => i["uid"] === t["profile"])[0]["key"];
        // console.log('id_tr', id_tr, color);
        $('#tr_'+ id_tr).css("background-color", color);
        return;
    })
    let count_ok = checks.filter(t => t["status"] === "LIVE").length;
    let count_die = checks.filter(t => t["status"] === "DIE").length;
    let count_kxd = checks.filter(t => t["status"] === "KXD").length;
    $('#count_live_account').html(count_ok);
    $('#count_die_account').html(count_die);
    $('#count_kxd_account').html(count_kxd);
}

async function checkOnePostSpam(id_textarea){
    let posts = $('#textarea_'+ id_textarea).val().toString().split('\n');
    $('#count_live_post_child').text('0');
    $('#count_die_post_child').text('0');
    $('#count_kxd_post_child').text('0');
    $('#show_post_child').html('');
    $('#modal-show-post-child').modal('show');
    var kq = await ky.post("/checkPostChild", {
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
            posts: JSON.stringify(posts)
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
        };
    });
    if( kq["status"] === "error" ){
        noti_error("Check post child fail");
        $('#modal-show-post-child').modal('hide');
        return;
    }
    let checks = kq["checks"];
    let count_ok = checks.filter(t => t["status"] === "LIVE").length;
    let count_die = checks.filter(t => t["status"] === "DIE").length;
    let count_kxd = checks.filter(t => t["status"] === "KXD").length;
    $('#count_live_post_child').html(count_ok);
    $('#count_die_post_child').html(count_die);
    $('#count_kxd_post_child').html(count_kxd);
    let htmls = checks.map(t => {
        let color;
        switch(t["status"]) {
            case "LIVE":
              color= "green";
              break;
            case "DIE":
                color= "red";
              break;
            default:
                color= "black";
          }
          let danhdau = "- ";
          let id_post = t.post;
          if( id_post.includes("xxx") ){
            danhdau = "Link gốc: ";
          }
          let id_hienthi = id_post.replace("xxx", "");
        return `${danhdau} <a style="color:${color}" href="https://fb.com/${id_hienthi}" target="_bank">https://www.facebook.com/${id_hienthi}</a>`;
    }).join('<br/>');
    $('#show_post_child').html(htmls);
    return;
}