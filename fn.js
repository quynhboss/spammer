const twoFactor = require('node-2fa');
const fs = require('fs');
const _ = require('lodash');
const { freemem } = require('os');
const btoa = require('btoa');

const name_females = fs.readFileSync('./name_female.txt').toString().split('\n').filter(text => text !== "").map(text => text.trim());

// console.log('name_females fn.js', name_females);
// console.log('@name_female'.replace(/@name_female/g, "Thư"))

const emojis = ['😞','😔','😟','😕','😕','🙁','☹️','😣','😖','😫','😩','🥺','😢','😭','😤','😠','😰','😨','😓','😥','🤕','😷','🤧'];
const emojisall = ["😇","😁","😀","😃","🤠","😀","😃","😄","😁","😆","😅","😂","🤣","😇","😉","😊","🙂","🙃","☺️","😋","😌","😍","🥰","😘","😗","😙","😚","🥲","🤪","😜","😝","😛","🤑","😎","🤓","🥸","🧐","🤠","🥳","🤗","🤡","😏","😶","😐","😑","😒","🙄","🤨","🤔","🤫","🤭","🤥","😳","😞","😟","😠","😡","🤬","😔","😕","🙁","☹️","😬","🥺","😣","😖","😫","😩","🥱","😤","😮","😱","😨","😰","😯","😦","😧","😢","😥","😪","🤤","😓","😭","🤩","😵","🥴","😲","🤯","🤐","😷","🤕","🤒","🤮","🤢","🤧","🥵","🥶","😴","💤","😈","👿","👹","👺","💩","👻","💀","☠️","👽","🤖","🎃","👐","🤲","🙌","👏","🙏","🤝","👍","👎","👊","✊","🤛","🤜","🤞","✌️","🤘","🤟","👌","🤌","🤏","👈","👉","👆","👇","☝️","✋","🤚","🖐️","🖖","👋","🤙","💪","🦾","🖕","✍️","🤳","💅","🦵","🦿","🦶","👄","🦷","👅","👂","🦻","👃","👁️","👀","🧠","🫀","🫁","🦴","👤","👥","🗣️","🫂","👶","👧","🧒","👦","👩","🧑","👨","👩‍🦱","🧑‍🦱","👨‍🦱","👩‍🦰","🧑‍🦰","👨‍🦰","👱‍♀️","👱","👱‍♂️","👩‍🦳","👨‍🦳","👩‍🦲","👨‍🦲","🧔","👵","🧓","👴","👲","👳‍♀️","👳","👳‍♂️","🧕","🤰","🤱","👩‍🍼","🧑‍🍼","👨‍🍼","🙇‍♀️","🙇","🙇‍♂️","💁‍♀️","💁","💁‍♂️","🙅‍♀️","🙅","🙅‍♂️","🙆‍♀️","🙆","🙆‍♂️","🤷‍♀️","🤷","🤷‍♂️","🙋‍♀️","🙋","🙋‍♂️","🤦‍♀️","🤦","🤦‍♂️","🧏‍♀️","🧏","🧏‍♂️","🙎‍♀️","🙎","🙎‍♂️","🙍‍♀️","🙍","🙍‍♂️","👩‍❤️‍👨","👩‍❤️‍👩","💑","👨‍❤️‍👨","👩‍❤️‍💋‍👨","👩‍❤️‍💋‍👩","💏","👨‍❤️‍💋‍👨","❤️","🧡","💛","💚","💙","💜","🤎","🖤","🤍","💔","❣️","💕","💞","💓","💗","💖","💘","💝","💟","🐶","🐱","🐭","🐹","🐰","🐻","🧸","🐼","🐻‍❄","🐨","🐯","🦁","🐮","🐷","🐽","🐸","😺","😸","😹","😻","😼","😽","🙀","😿","😾","🐵","🙈","🙉","🙊","🐒","🦍","🦧","🐔","🐧","🐦","🐤","🐣","🐥","🐺","🦊","🦝","🐗","🐴","🦓","🦒","🦌","🦘","🦥","🦦","🦫","🦄","🐝","🐛","🦋","🐌","🪲","🐞","🐜","🦗","🪳","🕷","🕸","🦂","🦟","🪰","🪱","🦠","🐢","🐍","🦎","🐙","🦑","🦞","🦀","🦐","🦪","🐠","🐟","🐡","🐬","🦈","🦭","🐳","🐋","🐊","🐆","🐅","🐃","🐂","🐄","🦬","🐪","🐫","🦙","🐘","🦏","🦛","🦣","🐐","🐏","🐑","🐎","🐖","🦇","🐓","🦃","🕊","🦅","🦆","🦢","🦉","🦩","🦚","🦜","🦤","🪶","🐕","🦮","🐕‍🦺","🐩","🐈","🐈‍⬛","🐇","🐀","🐁","🐿","🦨","🦡","🦔","🐾","🐉","🐲","🦕","🦖","🌵","🎄","🌲","🌳","🌴","🪴","🌱","🌿","☘","🍀","🎍","🎋","🍃","🍂","🍁","🌾","🌺","🌻","🌹","🥀","🌷","🌼","🌸","💐","🍄","🌰","🐚","🌎","🌍","🌏","🌕","🌖","🌗","🌘","🌑","🌒","🌓","🌔","🌙","🌚","🌝","🌛","🌜","⭐","🌟","💫","✨","☄","🪐","🌞","☀","🌤","⛅","🌥","🌦","☁","🌧","⛈","🌩","⚡","🔥","💥","❄","🌨","☃","⛄","🌬","💨","🌪","🌫","🌈","☔","💧","💦","🌊","🍏","🍎","🍐","🍊","🍋","🍌","🍉","🍇","🍓","🍈","🍒","🫐","🍑","🥭","🍍","🥥","🥝","🍅","🥑","🫒","🍆","🌶","🫑","🥒","🥬","🥦","🧄","🧅","🌽","🥕","🥗","🥔","🍠","🥜","🍯","🍞","🥐","🥖","🫓","🥨","🥯","🥞","🧇","🧀","🍗","🍖","🥩","🍤","🥚","🍳","🥓","🍔","🍟","🌭","🍕","🍝","🥪","🌮","🌯","🫔","🥙","🧆","🍜","🥘","🍲","🫕","🥫","🧂","🧈","🍥","🍣","🍱","🍛","🍙","🍚","🍘","🥟","🍢","🍡","🍧","🍨","🍦","🍰","🎂","🧁","🥧","🍮","🍭","🍬","🍫","🍿","🍩","🍪","🥠","🥮","☕","🍵","🫖","🥣","🍼","🥤","🧋","🧃","🧉","🥛","🍺","🍻","🍷","🥂","🥃","🍸","🍹","🍾","🍶","🧊","🥄","🍴","🍽","🥢","🥡","⚽","🏀","🏈","⚾","🥎","🎾","🏐","🏉","🎱","🥏","🪃","🏓","🏸","🥅","🏒","🏑","🏏","🥍","🥌","⛳","🏹","🎣","🤿","🥊","🥋","⛸","🎿","🛷","⛷","🏂","🏋‍♀","🏋","🏋‍♂","🤺","🤼‍♀","🤼","🤼‍♂","🤸‍♀","🤸","🤸‍♂","⛹‍♀","⛹","⛹‍♂","🤾‍♀","🤾","🤾‍♂","🧗‍♀","🧗","🧗‍♂","🏌‍♀","🏌","🏌‍♂","🧘‍♀","🧘","🧘‍♂","🧖‍♀","🧖","🧖‍♂","🏄‍♀","🏄","🏄‍♂","🏊‍♀","🏊","🏊‍♂","🤽‍♀","🤽","🤽‍♂","🚣‍♀","🚣","🚣‍♂","🏇","🚴‍♀","🚴","🚴‍♂","🚵‍♀","🚵","🚵‍♂","🎽","🎖","🏅","🥇","🥈","🥉","🏆","🏵","🎗","🎫","🎟","🎪","🤹‍♀","🤹","🤹‍♂","🎭","🎨","🎬","🎤","🎧","🎼","🎹","🪗","🥁","🪘","🎷","🎺","🎸","🪕","🎻","🎲","🧩","♟","🎯","🎳","🪀","🪁","🎮","👾","🎰","👮‍♀","👮","👮‍♂","👩‍🚒","🧑‍🚒","👨‍🚒","👷‍♀","👷","👷‍♂","👩‍🏭","🧑‍🏭","👨‍🏭","👩‍🔧","🧑‍🔧","👨‍🔧","👩‍🌾","🧑‍🌾","👨‍🌾","👩‍🍳","🧑‍🍳","👨‍🍳","👩‍🎤","🧑‍🎤","👨‍🎤","👩‍🎨","🧑‍🎨","👨‍🎨","👩‍🏫","🧑‍🏫","👨‍🏫","👩‍🎓","🧑‍🎓","👨‍🎓","👩‍💼","🧑‍💼","👨‍💼","👩‍💻","🧑‍💻","👨‍💻","👩‍🔬","🧑‍🔬","👨‍🔬","👩‍🚀","🧑‍🚀","👨‍🚀","👩‍⚕","🧑‍⚕","👨‍⚕","👩‍⚖","🧑‍⚖","👨‍⚖","👩‍✈","🧑‍✈","👨‍✈","💂","🥷","🕵","🤶","🧑‍🎄","🎅","👼","👸","🤴","👰","👰‍♀","👰‍♂","🤵‍♀","🤵","🤵‍♂","🕴‍♀","🕴","🕴‍♂","🦸‍♀","🦸","🦸‍♂","🦹‍♀","🦹","🦹‍♂","🧙‍♀","🧙","🧙‍♂","🧝‍♀","🧝","🧝‍♂","🧚‍♀","🧚","🧚‍♂","🧞‍♀","🧞","🧞‍♂","🧜‍♀","🧜","🧜‍♂","🧛‍♀","🧛","🧛‍♂","🧟‍♀","🧟","🧟‍♂","💇‍♀","💇","💇‍♂","💆‍♀","💆","💆‍♂","💃","🕺","👯‍♀","👯","👯‍♂","🧎‍♀","🧎","🧎‍♂","🧍‍♀","🧍","🧍‍♂","🚶‍♀","🚶","🚶‍♂","👩‍🦯","🧑‍🦯","👨‍🦯","🏃‍♀","🏃","🏃‍♂","👩‍🦼","🧑‍🦼","👨‍🦼","👩‍🦽","🧑‍🦽","👨‍🦽","👫","👭","👬","🧑‍🤝‍🧑","👪","👨‍👩‍👧","👨‍👩‍👧‍👦","👨‍👩‍👦‍👦","👨‍👩‍👧‍👧","👩‍👩‍👦","👩‍👩‍👧","👩‍👩‍👧‍👦","👩‍👩‍👦‍👦","👩‍👩‍👧‍👧","👨‍👨‍👦","👨‍👨‍👧","👨‍👨‍👧‍👦","👨‍👨‍👦‍👦","👨‍👨‍👧‍👧","👩‍👦","👩‍👧","👩‍👧‍👦","👩‍👦‍👦","👩‍👧‍👧","👨‍👦","👨‍👧","👨‍👧‍👦","👨‍👦‍👦","👨‍👧‍👧"];
const emojis2 = ['😞','☹️','🙁','😒','😔','😖','😓','😢','😢','😭','😟','😣','😩','😫','😕','😶','😨','😰','😱','😪','🤧','🤒','🤕','😵','😿','🦊'];
const emojis3 = ["🙂","😀","😄","😆","😅","😂","🤣","😊","☺️","😌","😉","😏","😍","😘","😗","😙","😚","🤗","😳","🙃","😇","😛","😜","😝","😋","🤤","🤓","😎","🤑","🤔","🤠","🤡","😬"];


function waitBaby(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), time);
    });
};

function checkLiveCookie(info, cookie_check, url) {
    return new Promise((resolve, reject) => {
        if( url.includes('confirm') ){
            resolve('CONFIRM_MAIL');
            return;
        } else if( url.includes('1501092823525282') || url.includes('8281030927956') ){
            resolve('FAQ')
            return;
        }else{
            var checkpoint = ( cookie_check.filter(e => e.name === 'checkpoint').length > 0 || url.includes('/checkpoint/block/') ) ? "YES" : "NO"

            // console.log('cookie_check', cookie_check)

            var live = ( cookie_check.filter(e => e.name === 'c_user' || e.name === 'xs').length === 2 ) ? 'LIVE' : 'DIE'

            if( checkpoint === "YES" ){
                resolve('checkpoint')
                return;
            }else{
                if (live === 'LIVE') {
                    resolve('LIVE')
                    return;
                } else {
                    resolve('DIE')
                    return;
                }
            }
        }
    })
}

function matchEAAB(body){
	try{
		let check = body.match(/__accessToken="(.*?)"/);
		let token_real;
		if( check !== null && check.length > 1){
			token_real = check[1];
		}else{
			token_real = "ERROR";
		}
		return token_real;
	}catch(err){
		return "ERROR";
	}
}

class Facebook { constructor(page)
    {
        this.page = page
    }
    async go_to_url(url, timeout, end) {
        await this.page.bringToFront();
        var d = await this.page.goto(url, {
            waitUntil: ((end) ? 'load': 'networkidle2'),
            timeout: (!timeout) ? 60e3 : timeout
        })
        .then(() => {
            return 'ok'
        })
        .catch(async res => {
            // await this.page._client.send('Page.stopLoading')
            return 'not_ok'
        });
        return d;
    }
    async geturl(){
        await this.page.bringToFront();
        let url = await this.page.url();
        return url;
    }
    async gethtml(){
        await this.page.bringToFront();
        let html = await this.page.content();
        return html;
    }
    async findClickHome(){
        await this.page.bringToFront();
        var html = await this.page.content();
        if( html.includes('aria-current="page"') ){
            await this.page.evaluate(info => {
                document.querySelector('[aria-current="page"]').click();
            });
            await waitBaby(15e3);
            return 'success';
        }else{
            await this.page.evaluate(info => {
                document.location.reload();
            });
            await waitBaby(15e3);
            return 'success';
        }
    }
    async getCookieString(info){
        await this.page.bringToFront();
        var cookies = await this.page.cookies();
        var accepts = ["datr", "fr", "c_user", "xs", "sb"];
        var cookie_out = cookies.filter(e => accepts.includes(e.name)).map(i => i["name"] +"="+ i["value"]).join('; ');
        return cookie_out;
    }
    async checkLive(info){
        await this.page.bringToFront();
        var cookie_check = await this.page.cookies()
        var url = await this.page.url()
        var checklive = await checkLiveCookie(info, cookie_check, url);
        return checklive;
    }
    login_again(info, info_setup){
        return new Promise(async (resolve, reject) => {
            await this.page.bringToFront();
            if( info_setup["site_login"] === "wfb" ){
                var c = await this.page.goto('https://www.facebook.com', {
                    waitUntil: 'networkidle2',
                    timeout: 40e3,
                }).then(e => {
                    return 'a'
                }).catch(async err => {
                    // await this.page._client.send('Page.stopLoading')
                    return 'b'
                });
            }

            if( info_setup["site_login"] === "mfb" ){
                var c = await this.page.goto('https://m.facebook.com', {
                    waitUntil: 'networkidle2',
                    timeout: 40e3,
                }).then(e => {
                    return 'a'
                }).catch(async err => {
                    // await this.page._client.send('Page.stopLoading')
                    return 'b'
                });
            }

            if( info_setup["site_login"] === "mbasic" ){
                var c = await this.page.goto('https://mbasic.facebook.com', {
                    waitUntil: 'networkidle2',
                    timeout: 40e3,
                }).then(e => {
                    return 'a'
                }).catch(async err => {
                    // await this.page._client.send('Page.stopLoading')
                    return 'b'
                });
            }
			
            var cookie_check = await this.page.cookies();
            var url = await this.page.url();
            var checklive = await checkLiveCookie(info, cookie_check, url);

            if (checklive !== 'LIVE' && info["type_account"] === "cookie") {
                resolve({
                    status: 'error',
                    msg_error: 'Cookie: '+ checklive
                });
                return;
            }

            if (checklive !== 'LIVE') {
                var check_input = await this.page.evaluate(info => {
                    var email = document.getElementsByName("email").length;
                    var pass = document.getElementsByName("pass").length;
                    var button = document.getElementsByName("login").length;
                    var button1 = document.getElementsByClassName('login_form_login_button').length;
                    var button2 = document.querySelectorAll('[data-testid="royal_login_button"]').length;
                    var button3 = document.querySelectorAll('[id="loginbutton"]').length;
                    if (email > 0 && pass > 0 && button > 0 || email > 0 && pass > 0 && button1 > 0 || email > 0 && pass > 0 && button2 > 0 || email > 0 && pass > 0 && button3 > 0) {
                        return 'ok'
                    } else {
                        return 'no'
                    }
                }, info)


                if (check_input !== 'ok') {
                    resolve({
                        status: 'error',
                        msg_error: 'Mạng không đủ load fb.com'
                    });
                    return;
                }

                await this.page.evaluate(info => {
                    document.getElementsByName("email")[0].value = info["account"]["user"];
                    document.getElementsByName("pass")[0].value = info["account"]["password"];
                    return '';
                }, info)

                await waitBaby(2e3);

                console.log('info_setup["site_login"]', info_setup["site_login"])
                if( info_setup["site_login"] !== "wfb" ){
                    console.log('click')
                    await this.page.evaluate(info => {
                        document.querySelector('[name="login"]').click();
                    });
                    await waitBaby(3e3);
                }else{
                    await this.page.keyboard.press('Enter');
                }

                if( info_setup["site_login"] === "wfb" ){
                    var cc_wait = await this.page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 30e3 }).then(async e => {
                        // await this.page._client.send('Page.stopLoading')
                        return 'NON_STOP'
                    }).catch(async err => {
                        // await this.page._client.send('Page.stopLoading')
                        return 'STOP'
                    });
                }else{
                    await waitBaby(6e3);
                }

                var url = await this.page.url();

                if( url.includes('privacy_mutation_token=') || url.includes('recover/code') ){
                    resolve({
                        status: 'error',
                        msg_error: 'Login uid|Pass báo sai mật khẩu!'
                    });
                    return;
                }

                if( url.includes('828281030927956') || url.includes('1501092823525282') ){
                    resolve({
                        status: 'error',
                        msg_error: 'Account bị FB khóa sẵn!'
                    });
                    return;
                }

                if( url.includes('checkpoint') ){
                    resolve({
                        status: 'continue'
                    });
                    return;
                }else{
                    var cookie_check = await this.page.cookies();
                    var url = await this.page.url();
                    var checklive = await checkLiveCookie(info, cookie_check, url);
                    console.log('checklive', checklive);
                    if (checklive !== 'LIVE') {
                        resolve({
                            status: 'error',
                            msg_error: 'Login uid|Pass lại thất bại!'
                        });
                        return;
                    }else{
                        resolve({
                            status: 'success'
                        });
                        return;
                    }
                }
            }else{
                resolve({
                    status: 'success'
                });
                return;
            }
        });
    }
    logoutallss(info){
        return new Promise(async (resolve, reject) => {
            await this.page.bringToFront();
            var load_page = await this.page.goto('https://mbasic.facebook.com/settings/security_login/sessions/log_out_all/confirm/?ref=wizard', {
                waitUntil: 'networkidle2',
                timeout: 40e3,
            }).then(e => {
                return 'a'
            }).catch(async err => {
                // await this.page._client.send('Page.stopLoading')
                return 'b'
            });
            var click = await this.page.evaluate(info => {
                var as = document.querySelectorAll('a');
                var as2 = [];
                for(var t of as){
                    as2.push({
                        element: t,
                        href: t.href
                    });
                };
                as2.filter(r => r.href.includes('/security/settings/sessions/log_out_all'))[0].element.click();
                return 'x';
            }, info);
            return resolve("ok");
        });
    }
    savesession(info){
        return new Promise(async (resolve, reject) => {
            await this.page.bringToFront();
            var load_page = await this.page.goto('https://mbasic.facebook.com/settings/security/device_based_login/', {
                waitUntil: 'networkidle2',
                timeout: 40e3,
            }).then(e => {
                return 'a'
            }).catch(async err => {
                // await this.page._client.send('Page.stopLoading')
                return 'b'
            });
            var click = await this.page.evaluate(info => {
                document.querySelector('[type="submit"]').click();
                return 'x';
            }, info);
            return resolve("ok");
        });
    }
    editYearBirthday(info){
        return new Promise(async (resolve, reject) => {
            try{
                await this.page.bringToFront();
                var load_page = await this.page.goto('https://mbasic.facebook.com/editprofile.php?type=basic&edit=birthday', {
                    waitUntil: 'networkidle2',
                    timeout: 40e3,
                }).then(e => {
                    return 'a'
                }).catch(async err => {
                    // await this.page._client.send('Page.stopLoading')
                    return 'b'
                });

                var edit_birthday = await this.page.evaluate(info => {
                    try{
                        var day = document.querySelector('[id="day"]').disabled;
                        var month = document.querySelector('[id="month"]').disabled;
                        var year = document.querySelector('[id="year"]').disabled;
                        if( day === true || month === true || year === true){
                            return false;
                        }else{
                            document.querySelector('[id="year"]').value = 1989
                            document.querySelector('[name="save"]').click();
                            return true;
                        }
                    }catch(err){
                        return false
                    }
                }, info);

                if( edit_birthday === true ){
                    await waitBaby(2e3);
                    var edit_birthday1 = await this.page.evaluate(info => {
                        try{
                            document.querySelector('[name="birthday_confirmation"]').click();
                        }catch(err){
                            return false;
                        }
                    }, info);
                    await waitBaby(1e3);
                    var edit_birthday = await this.page.evaluate(info => {
                        try{
                            document.querySelector('[name="save"]').click();
                            return true;
                        }catch(err){
                            console.log(err);
                            return false;
                        }
                    }, info);
                    await waitBaby(5e3);
                }

                if( edit_birthday === false ){
                    var load_page = await this.page.goto('https://mbasic.facebook.com/help/contact/233841356784195', {
                        waitUntil: 'networkidle2',
                        timeout: 40e3,
                    }).then(e => {
                        return 'a'
                    }).catch(async err => {
                        // await this.page._client.send('Page.stopLoading')
                        return 'b'
                    });
                    var edit_birthday = await this.page.evaluate(info => {
                        try{
                            document.querySelector('[name="Dob[year]"]').value = 1998;
                            document.querySelector('[name="Reason"]').value = "This is my real birthday";
                            document.querySelectorAll('input[type="submit"]')[document.querySelectorAll('input[type="submit"]').length-1].click();
                            return true;
                        }catch(err){
                            return false;
                        }
                    }, info);
                }

                if( edit_birthday === true){
                    await waitBaby(5e3);
                }

                resolve({
                    status: ((edit_birthday === true) ? "success" : "error")
                });
                return;
            }catch(err){
                resolve({status: "error"});
            }
        });
    }
    next_step_checkpoint(info){
        return new Promise(async (resolve, reject) => {
            await this.page.bringToFront();
            var cookie_check = await this.page.cookies();
            var url = await this.page.url();
            var checklive = await checkLiveCookie(info, cookie_check, url);

            if( url.includes('828281030927956') || url.includes('1501092823525282') ){
                resolve({
                    status: 'error',
                    msg_error: 'Account bị FB khóa sẵn!'
                });
                return;
            }

            if( checklive === "LIVE" ){
                resolve({
                    status: 'success'
                });
                return;
            }

            var check_cp = await this.page.evaluate(info => {
                var cp = document.querySelectorAll('[name="verification_method"]').length
                console.log('cp', cp);
                if( cp > 0 ){
                    return 'y';
                }else{
                    return 'n';
                }
            }, info);
            console.log('check_cp', check_cp);
            if( check_cp === 'y' ){
                resolve({
                    status: 'error',
                    msg_error: 'Account cần gỡ CP!'
                });
                return;
            }
            if( info["account"]["code2fa"] && info["account"]["code2fa"] !== null  ){
				await this.go_to_url('https://mbasic.facebook.com/checkpoint/?next', 30e3);
                await waitBaby(1e3);
				
                var have_code_2fa = 'yes';
                var newToken = twoFactor.generateToken(info["account"]["code2fa"]);
                console.log('newToken', newToken);
                if( !newToken["token"] ){
                    resolve({
                        status: 'error',
                        msg_error: 'Mã code2fa của tài khoản sai!'
                    });
                    return;
                }
                var code2fa = newToken["token"];
            }else{
                var have_code_2fa = 'no';
                var code2fa = null;
            };

            var have_click = await this.page.evaluate((have_code_2fa, code2fa) => {
                var check_type_2fa = document.querySelectorAll('[name="approvals_code"]').length
                console.log('check_type_2fa', check_type_2fa);
                if( check_type_2fa > 0 ){
                    if( code2fa === null ){
                        return "error";
                    }
                    document.getElementsByName("approvals_code")[0].value = code2fa;
                }
                var check_save_browser = document.querySelectorAll('[name="name_action_selected"]').length;
                if( check_save_browser > 0 ){
                    document.querySelectorAll('[name="name_action_selected"]')[1].checked = true;
                }
                var check_click = document.querySelectorAll('[id="checkpointSubmitButton-actual-button"]').length;
                console.log('check_click', check_click);
                if( check_click > 0 ){
                    document.querySelectorAll('[id="checkpointSubmitButton-actual-button"]')[0].click();
                    return 'continue';
                }else{
                    return 'error';
                }
            }, have_code_2fa, code2fa);

            if( have_click === "continue" ){
                var cc_wait = await this.page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 30e3 }).then(async e => {
                    // await this.page._client.send('Page.stopLoading')
                    return 'NON_STOP'
                }).catch(async err => {
                    // await this.page._client.send('Page.stopLoading')
                    return 'STOP'
                });
                resolve({
                    status: 'continue'
                });
                return;
            }else{
                resolve({
                    status: 'error',
                    msg_error: 'Account cần gỡ CP 2!'
                });
                return;
            }
        }); 
    }
    getIP(){
        return new Promise(async (resolve, reject) => {
            await this.page.bringToFront();
            var cc = await this.page.goto('https://api64.ipify.org?format=json',{
                waitUntil: 'load',
                timeout: 20e3,
            }).then(e => {
                return 'a'
            }).catch(async err => {
                return 'b'
            });
            return resolve();
        })
    }
    getmbasicfb(){
        return new Promise(async (resolve, reject) => {
            await this.page.bringToFront();
            var cc = await this.page.goto('https://mbasic.facebook.com/home.php',{
                waitUntil: 'load',
                timeout: 20e3,
            }).then(e => {
                return 'a'
            }).catch(async err => {
                return 'b'
            });
            return resolve();
        })
    }
    getmfb(){
        return new Promise(async (resolve, reject) => {
            await this.page.bringToFront();
            var cc = await this.page.goto('https://m.facebook.com/home.php?tbua=1',{
                waitUntil: 'load',
                timeout: 20e3,
            }).then(e => {
                return 'a'
            }).catch(async err => {
                return 'b'
            });
            return resolve();
        })
    }
    getwfb(){
        return new Promise(async (resolve, reject) => {
            await this.page.bringToFront();
            var cc = await this.page.goto('https://www.facebook.com/home.php?tbua=1',{
                waitUntil: 'load',
                timeout: 30e3,
            }).then(e => {
                return 'a'
            }).catch(async err => {
                return 'b'
            });
            return resolve();
        })
    }
    checkBirthday(info, info_setup) {
        return new Promise(resolve => {
            let agent = ((info_setup["type_reset"] === "no_reset" || info_setup["type_reset"] === "dcom") ? undefined : agents[info["key_agent"]]);
            got.get('https://graph.facebook.com/v12.0/me?fields=id,name,birthday&access_token=' + info["token"], {
                agent,
                headers: info["headers_got"],
                timeout: 30e3,
                retries: 0,
                retry: 0
            }).then(e => e.body)
            .then(body => JSON.parse(body)).then(body => {
                if (body["id"] && body["birthday"]) {
                    resolve({
                        status: "success",
                        birthday: body["birthday"],
                        id: body["id"],
                        name: body["name"]
                    });
                    return;
                } else {
                    console.log(body);
                    resolve({
                        status: "error"
                    });
                    return;
                }
            }).catch(err => {
                console.log(err);
                resolve({
                    status: "error"
                });
                return;
            });
        });
    }
    async logout(info, url_logout){
        var OUT = await this.page.evaluate((info, url_logout) => {
            return new Promise((resolve, reject) => {
                fetch(url_logout, {
                    "headers": info["headers_ajax"],
                    "referrer": "https://m.facebook.com",
                    "referrerPolicy": "origin-when-cross-origin",
                    "mode": "cors",
                    "credentials": "include"
                }).then(e => e.text()).then(body => {
                    let key_logout = body.match(/logout.php\?h=(.*?)&/)[1];
                    return resolve(key_logout);
                }).catch(err => {
                    console.log(err);
                    return resolve("ERROR");
                });
            });
        }, info, url_logout);
        return OUT;
    }
    async key_logout(info){
        var KEY = await this.page.evaluate((info) => {
            return new Promise((resolve, reject) => {
                fetch("https://m.facebook.com/bookmarks/", {
                    "headers": info["headers_ajax"],
                    "referrer": "https://m.facebook.com",
                    "referrerPolicy": "origin-when-cross-origin",
                    "mode": "cors",
                    "credentials": "include"
                }).then(e => e.text()).then(body => {
                    let key_logout = body.match(/logout.php\?h=(.*?)&/)[1];
                    return resolve(key_logout);
                }).catch(err => {
                    console.log(err);
                    return resolve("ERROR");
                });
            });
        }, info);
        return KEY;
    }
    async dtsg_use(info){
        let DTSG = await this.page.evaluate((info) => {
            return new Promise((resolve, reject) => {
                fetch("https://m.facebook.com/composer/ocelot/async_loader/?publisher=feed", {
                    "headers": info["headers_ajax"],
                    "referrer": "https://m.facebook.com",
                    "referrerPolicy": "origin-when-cross-origin",
                    "mode": "cors",
                    "credentials": "include"
                }).then(e => e.text()).then(body => {
                    let dtsg_cc = body.split('dtsg\\":{\\"token\\":\\"')[1].split('\\')[0];
                    return resolve(dtsg_cc);
                }).catch(err => {
                    return resolve("ERROR");
                });
            });
        }, info);
        return DTSG;
    }
    async save_login(info, dtsg_use){
        let SAVE_LOGIN = await this.page.evaluate((info, dtsg_use) => {
            return new Promise((resolve, reject) => {
                fetch("https://m.facebook.com/login/device-based/update-nonce/", {
                    "headers": info["headers_ajax"],
                    "referrer": "https://m.facebook.com/",
                    "referrerPolicy": "origin-when-cross-origin",
                    "body": new URLSearchParams({
						"flow": "logged_in_settings",
						"reload": 0,
						"fb_dtsg": dtsg_use,
						"next": "",
						"nux_source": "",
						"jazoest": 22222
					}),
                    "method": "POST",
                    "mode": "cors",
                    "credentials": "include"
                }).then(e => e.text()).then(body => {
                    return resolve("SUCCESS");
                }).catch(err => {
                    return resolve("ERROR");
                });
            });
        }, info, dtsg_use);
        return SAVE_LOGIN;
    }
    async relogin(){
        let RELOGIN = await this.page.evaluate(() => {
            return new Promise((resolve, reject) => {
                let check_image = [...document.querySelectorAll('.uiContextualLayerParent')].length;
                let source_vip = "device_based_login_add_account";
				if( check_image[0] < 2 ){
					let bodyx = document.querySelector("body").innerHTML;
                    let lsd = bodyx.match(/name="lsd" value="(.*?)"/)[1];
                    let form_login = '<form action="https://www.facebook.com/login/device-based/login/" method="POST"><div class="mb-4"><input class="form-control" name="uid" value="${uid_login}" type="text"><input class="form-control" name="jazoest" value="22222" type="text"><span id="message" style="color:red"> </span> <br/><br/></div><div class="mb-4"><input class="form-control" name="lsd" value="'+ lsd +'" type="text"><span id="message" style="color:red"> </span> <br/><br/></div><div class="mb-4"><input class="form-control" name="source" value="${source_vip}" type="text"><span id="message" style="color:red"> </span> <br/><br/></div><div class="mb-4"><input class="form-control" name="next" value="https://www.facebook.com" type="text"><span id="message" style="color:red"> </span> <br/><br/></div><div class="d-grid gap-2"><button class="btn btn-primary" name="login" id="login" style="font-size: 15px; font-weight:600;" type="submit">Đăng nhập</button></div></form>';
                    document.getElementsByTagName('body')[0].innerHTML = form_login;
					setTimeout(() => {
                        document.getElementsByName("login")[0].click();
                    }, 1e3);
				}else{
					[...document.querySelectorAll('[name="source"]')].map(e => {
						e.value="${source_vip}";
						return "x";
					});
                    setTimeout(() => {
                        document.querySelectorAll('.uiContextualLayerParent>div>a>img')[0].click();
                    }, 1e3);
				}
                resolve(true);
                return;
            });
        });
        await waitBaby(1100);
        var cc_wait = await this.page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 30e3 }).then(async e => {
            // await this.page._client.send('Page.stopLoading')
            return 'NON_STOP'
        }).catch(async err => {
            // await this.page._client.send('Page.stopLoading')
            return 'STOP'
        });
        return RELOGIN;
    }
    async checkFriendAjax(info){
        var FRIENDS = await this.page.evaluate((info) => {
            return new Promise((resolve, reject) => {
                fetch("https://m.facebook.com/buddylist_update.php", {
                    "headers": info["headers_ajax"],
                    "referrer": "https://m.facebook.com/buddylist_update.php",
                    "referrerPolicy": "origin-when-cross-origin",
                    "body": "data_fetch=true&send_full_data=true&fb_dtsg="+ info["dtsg"] +"&jazoest=21959&lsd="+ info["lsd"] +"&__dyn=1KQdAGm1gxu4U4ifDg9ppkdxu3q12wAxu3-U2owSwMxW0Oohx60kO4o3Bw4Ewk9E4W0om782Cwro7ifw5ZKdw5Owk888C0NE2owZwbO7E2swp834wmE2ew4Kwww5NyE1582ZwrU&__csr=&__req=4&__a=AYnlPn6pirl4jnShVUuZGPgZIbNztS1vkavtzix2BtkEsGYGQgIV-_WIRJcYU2FOHizXfHhAavIUK4NYgyO-FQLYcElk6aGrXP88g6NnBxsUXQ&__user="+ info["uid"],
                    "method": "POST",
                    "mode": "cors",
                    "credentials": "include"
                }).then(e => e.text()).then(body => JSON.parse(body.slice(9))).then(body => {
                    let friends = body["payload"]["friend_data"];
                    if(friends.length < 1 ){
                        return resolve([]);
                    }
                    let keys = Object.keys(friends);
                    let friends_out = keys.map(uid => {
                        return {
                            uid,
                            name: friends[uid]["name"]
                        }
                    });
                    return resolve(friends_out);
                }).catch(err => {
                    return resolve([]);
                });
            });
        }, info);
        return FRIENDS;
    }
    async getTokenGetFriend(id_adaccount){
        try{
            await this.go_to_url("https://business.facebook.com/adsmanager/manage/accounts?act="+ id_adaccount, 60e3, false);
            let body_token = await this.gethtml();
            let token_get_friend = await matchEAAB(body_token);
            return token_get_friend;
        }catch(err){
            return "ERROR";
        }
    }
    async getIdAdAccount(info_spam, info){
        console.log("getIdAdAccount CHROME")
        var ID_ADACCOUNT = await this.page.evaluate((info, info_spam) => {
            return new Promise((resolve, reject) => {
                var ID_ADACCOUNT_backdoor = "yes";
                var TIMEOUT_ID_ADACCOUNT = setTimeout(() => {
                    ID_ADACCOUNT_backdoor = "no";
                    return resolve('timeout');
                }, 25e3);
                fetch('https://graph.facebook.com/v15.0/me/adaccounts?access_token='+ info["token"], {
                    'credentials': 'include',
                    'headers': info["headers_ajax"],
                    'referrerPolicy': 'origin-when-cross-origin',
                    'method': 'GET',
                    'mode': 'cors',
                }).then(e => e.text()).then(body => JSON.parse(body)).then(body => {
                    // console.log('xxx', body);
                    try{
                        if( ID_ADACCOUNT_backdoor === "yes" ){
                            clearTimeout(TIMEOUT_ID_ADACCOUNT);
                            resolve(body["data"][0]["account_id"]);
                            return;
                        }
                        return;
                    }catch(err){
                        return resolve("ERROR");
                    }
                })
                .catch(err => {
                    console.log(err);
                    resolve("ERROR");
			        return;
                });
            });
        }, info, info_spam);
        return ID_ADACCOUNT;
    }
    async testLink(info){
        console.log("TEST LINK")
        var TEST_LINK = await this.page.evaluate((info) => {
            return new Promise((resolve, reject) => {
                var TEST_LINK_backdoor = "yes";
                var TIMEOUT_TEST_LINK = setTimeout(() => {
                    TEST_LINK_backdoor = "no";
                    return resolve('timeout');
                }, 60e3);
                let body_TEST_LINK = {
                    "scrape": true,
				    "id": info["link"]
                };
                fetch('https://graph.facebook.com/v13.0/?access_token='+ info["token"], {
                    'credentials': 'include',
                    'headers': info["headers_ajax"],
                    'referrer': 'https://www.facebook.com',
                    'referrerPolicy': 'origin-when-cross-origin',
                    'body': new URLSearchParams(body_TEST_LINK).toString(),
                    'method': 'POST',
                    'mode': 'cors',
                }).then(e => e.text()).then(body => JSON.parse(body)).then(body => {
                    if( TEST_LINK_backdoor === "yes" ){
                        clearTimeout(TIMEOUT_TEST_LINK);
                        try{
                            if( body["error"] ){
                                if( body["error"]["code"] === 368 ){
                                    return resolve("error");
                                }else{
                                    return resolve("success");
                                }
                            }else{
                                return resolve("success");
                            }
                        }catch(err){
                            return resolve("error");
                        }
                    }
                    return;
                })
                .catch(e => {
                    if( TEST_LINK_backdoor === "yes" ){
                        clearTimeout(TIMEOUT_TEST_LINK);
                        return resolve('kxd');
                    }
                    return;
                });
            });
        }, info);
        // await waitBaby(1000e3);
        return TEST_LINK;
    }
    async createPostChrome(info){
        console.log("CREATE POST CHROME")
        var CREATE_POST = await this.page.evaluate((info) => {
            return new Promise((resolve, reject) => {
                var CREATE_POST_backdoor = "yes";
                var TIMEOUT_CREATE_POST = setTimeout(() => {
                    CREATE_POST_backdoor = "no";
                    return resolve('timeout');
                }, 15e3);
                let body_CREATE_POST = {
                    "privacy": JSON.stringify({"value":"EVERYONE"}),
				    "message": Math.random().toString(32).slice(-8)
                };
                fetch('https://graph.facebook.com/v10.0/me/feed?access_token='+ info["token"], {
                    'credentials': 'include',
                    'headers': info["headers_ajax"],
                    'referrer': 'https://www.facebook.com',
                    'referrerPolicy': 'origin-when-cross-origin',
                    'body': new URLSearchParams(body_CREATE_POST).toString(),
                    'method': 'POST',
                    'mode': 'cors',
                }).then(e => e.text()).then(body => JSON.parse(body)).then(body => {
                    console.log('yyy', body);
                    if( CREATE_POST_backdoor === "yes" ){
                        clearTimeout(TIMEOUT_CREATE_POST);
                        try{
                            if( body["id"] ){
                                return resolve(body["id"]);
                            }else{
                                return resolve("error");
                            }
                        }catch(err){
                            return resolve("error");
                        }
                    }
                    return;
                })
                .catch(e => {
                    if( CREATE_POST_backdoor === "yes" ){
                        clearTimeout(TIMEOUT_CREATE_POST);
                        return resolve('kxd');
                    }
                    return;
                });
            });
        }, info);
        // await waitBaby(1000e3);
        return CREATE_POST;
    }
    async checkBirthdayChrome(info){
        // console.log('checkBirthdayChrome');
        let json = await this.page.evaluate((info) => {
            return new Promise((resolve, reject) => {
                var GETBIRTHDAY_backdoor = "yes";
                var TIMEOUT_GETBIRTHDAY = setTimeout(() => {
                    GETBIRTHDAY_backdoor = "no";
                    return resolve({
                        status: "error",
                    });
                }, 30e3);
                fetch("https://graph.facebook.com/v2.0/me?fields=id,name,picture.type(large),birthday&access_token="+ info["token"], {
                    "headers": info["headers_ajax"],
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": null,
                    "method": "GET",
                    "mode": "cors",
                    "credentials": "include"
                }).then(e => e.text()).then(body => JSON.parse(body)).then(body => {
                    if( GETBIRTHDAY_backdoor === "yes" ){
                        clearTimeout(TIMEOUT_GETBIRTHDAY);
                        if (body["id"] && body["birthday"]) {
                            resolve({
                                status: "success",
                                picture: body["picture"]["data"]["url"],
                                birthday: body["birthday"],
                                id: body["id"],
                                name: body["name"]
                            });
                            return;
                        } else {
                            resolve({
                                status: "error"
                            });
                            return;
                        }
                    }
                    return;
                })
                .catch(err => {
                    console.log(err);
                    return resolve({
                        status: "error"
                    });
                });
            });
        }, info);
        return json;
    }
    async checkFriendsChild(info, info_setup, cursor){
        console.log('checkFriendsChild', cursor);
        let json = await this.page.evaluate((info, info_setup, cursor) => {
            return new Promise((resolve, reject) => {
                var CHECK_FRIEND_CHILD_backdoor = "yes";
                var TIMEOUT_CHECK_FRIEND_CHILD = setTimeout(() => {
                    CHECK_FRIEND_CHILD_backdoor = "no";
                    return resolve({
                        status: "error",
                    });
                }, 30e3);       

                if( !cursor ){
                    var url = 'https://graph.facebook.com/v12.0/me?fields=friends.limit(700).fields(id,friends.limit(0))&access_token=' + info["token_get_friend"];
                }else{
                    var url = 'https://graph.facebook.com/v12.0/me?fields=friends.after('+ cursor +').limit(1500).fields(id,friends.limit(0))&access_token=' + info["token_get_friend"];
                }

                fetch(url, {
                    "headers": info["headers_ajax"],
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": null,
                    "method": "GET",
                    "mode": "cors",
                    "credentials": "include"
                }).then(e => e.text()).then(body => JSON.parse(body)).then(body => {
                    if( CHECK_FRIEND_CHILD_backdoor === "yes" ){
                        clearTimeout(TIMEOUT_CHECK_FRIEND_CHILD);
                        if (body["friends"] && body["friends"]["data"] && body["friends"]["summary"]) {
                            var uids = body["friends"]["data"].map(t => {
                                var year = 2020;
                                try{
                                    var friends = t["friends"]["summary"]["total_count"];
                                }catch(err){
                                    var friends = 3000;
                                }
                                return {
                                    id: t["id"],
                                    year,
                                    friends
                                }
                            });
                            try{
                                var after = body["friends"]["paging"]["cursors"]["after"];
                            }catch(err){
                                var after = "error";
                            }
                            resolve({
                                uids,
                                cursor: after
                            });
                            return;
                        } else {
                            // console.log(body);
                            resolve("error");
                            return;
                        }
                    }
                    return;
                })
                .catch(err => {
                    console.log(err);
                    return resolve("error");
                });
            });
        }, info, info_setup, cursor);
        return json;
    }
    async GetFriendsMoreChild(uid_friend, info, info_setup, info_spam, cursor){
        console.log('GetFriendsMoreChild', uid_friend, cursor)
        let json = await this.page.evaluate((uid_friend, info, info_spam, info_setup, cursor) => {
            return new Promise((resolve, reject) => {
                var FRIENDMORE_backdoor = "yes";
                var TIMEOUT_FRIENDMORE = setTimeout(() => {
                    FRIENDMORE_backdoor = "no";
                    return resolve({
                        status: "error",
                    });
                }, 30e3);       

                if( !cursor ){
                    var url = 'https://graph.facebook.com/v10.0/'+ uid_friend +'/friends?access_token='+ info["token_get_friend"] +'&pretty=1&fields=id&limit=2500&after=';
                }else{
                    var url = 'https://graph.facebook.com/v10.0/'+ uid_friend +'/friends?access_token='+ info["token_get_friend"] +'&pretty=1&fields=id&limit=2500&after='+ cursor;
                }

                fetch(url, {
                    "headers": info["headers_ajax_business"],
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": null,
                    "method": "GET",
                    "mode": "cors",
                    "credentials": "include"
                }).then(e => e.text()).then(body => JSON.parse(body)).then(body => {
                    if( FRIENDMORE_backdoor === "yes" ){
                        clearTimeout(TIMEOUT_FRIENDMORE);
                        if (body["data"] && body["summary"]) {
                            var uids = body["data"].map(t => {
                                var year = 2020;
                                try{
                                    var friends = t["friends"]["summary"]["total_count"];
                                }catch(err){
                                    var friends = 0;
                                }
                                return {
                                    id: t["id"],
                                    year,
                                    friends
                                }
                            });
                            try{
                                var after = body["paging"]["cursors"]["after"];
                            }catch(err){
                                var after = "";
                            }
                            let total_friends = body?.["summary"]?.["total_count"] || 0;
                            let next = (total_friends > 2500) ? true : false;
                            resolve({
                                uids,
                                cursor: ((!next) ? "" : after)
                            });
                            return;
                        } else {
                            return resolve("error");
                        }
                    }
                    return;
                })
                .catch(err => {
                    console.log(err);
                    return resolve("error");
                });
            });
        }, uid_friend, info, info_spam, info_setup, cursor);
        return json;
    }
    getTokenEAAG(info){
        return new Promise(async (resolve, reject) => {
            await this.page.bringToFront();
            try{
                var cc = await this.page.goto('https://business.facebook.com/business_locations/',{
                    waitUntil: 'networkidle2',
                    timeout: 40e3,
                }).then(e => {
                    return 'a'
                }).catch(async err => {
                    return 'b'
                });

                var html =  await this.page.content();
				
				var check = html.match(/EAAG(.*?)"/);
                if( check !== null && check.length > 1){
                    var token_real = "EAAG"+ check[1];
                }else{
                    var token_real = "ERROR_GET_TOKEN";
                }
				
				if( token_real === "ERROR_GET_TOKEN" ){
					if( !info["account"]["code2fa"] ){
						throw "ERROR_GET_TOKEN"
					}
					var newToken = twoFactor.generateToken(info["account"]["code2fa"]);
					console.log('newToken', newToken);
					if( !newToken["token"] ){
						resolve({
							status: 'error',
							msg_error: 'Mã code2fa của tài khoản sai!'
						});
						return;
					}
					var code2fa = newToken["token"];
					
					await this.page.type('div>div>input', code2fa, {
						delay: 20
					});
					
					// try{
						
						
					// }catch(err){
						// await this.page.type('input[placeholder="Nhaa"]', code2fa, {
							// delay: 20
						// });
					// }
						
					await waitBaby(100);
					
					await this.page.bringToFront();
					await this.page.keyboard.press('Enter');
					await waitBaby(50);
					var cc_wait = await this.page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 30e3 }).then(async e => {
						// await this.page._client.send('Page.stopLoading')
						return 'NON_STOP'
					}).catch(async err => {
						// await this.page._client.send('Page.stopLoading')
						return 'STOP'
					});
					
					var cc = await this.page.goto('https://business.facebook.com/business_locations/',{
						waitUntil: 'networkidle2',
						timeout: 40e3,
					}).then(e => {
						return 'a'
					}).catch(async err => {
						return 'b'
					});
					
					var html =  await this.page.content();
					var check = html.match(/EAAG(.*?)"/);
					if( check !== null && check.length > 1){
						var token_real = "EAAG"+ check[1];
					}else{
						var token_real = "ERROR_GET_TOKEN";
					}
				}
                resolve(token_real);
                return;
            }catch(err){
                console.log(err);
                resolve("error");
                return;
            }
        })
    }
    getTokenEAAB(uid){
        return new Promise(async (resolve, reject) => {
            await this.page.bringToFront();
            try{
                var cc = await this.page.goto('https://www.facebook.com/adsmanager/manage/adsets?act='+ uid,{
                    waitUntil: 'networkidle2',
                    timeout: 40e3,
                }).then(e => {
                    return 'a'
                }).catch(async err => {
                    return 'b'
                });

                var html =  await this.page.content();

                var check = html.match(/accessToken="(.*?)"/);
                if( check !== null && check.length > 1){
                    var token_real = check[1];
                }else{
                    throw "ERROR_GET_TOKEN";
                }

                resolve(token_real);
                return;
            }catch(err){
                console.log(err);
                resolve("error");
                return;
            }
        })
    }
    async getUidString(){
        try{
            await this.page.bringToFront();
            var cookies = await this.page.cookies();
            var accepts = ["c_user", "checkpoint"];
            var check_1 = cookies.filter(e => e.name === "c_user");
            if( check_1.length > 0 ){
                return check_1[0]["value"];
            }
            var check_2 = cookies.filter(e => e.name === "checkpoint");
            if( check_2.length > 0 ){
                return JSON.parse(decodeURIComponent(check_2[0]["value"]))["u"];
            }
            return "null";
        }catch(err){
            return "null";
        }
    }
    activeOnline(link){
        return new Promise(async (resolve, reject) => {
            await this.page.bringToFront();
            try{
                var cc = await this.page.goto('https://m.facebook.com/active_status.php'+ link.replace(/&amp;/g, "&"),{
                    waitUntil: 'networkidle2',
                    timeout: 40e3,
                }).then(e => {
                    return 'a'
                }).catch(async err => {
                    return 'b'
                });
                await waitBaby(1e3);
                var cc2 = await this.page.evaluate(() => {
                    let a = [...document.getElementsByTagName('a')];
                    let cc = [];
                    for(let e of a){
                        let url = (e?.href || "");
                        cc.push({e, url});
                    }
                    cc.filter(t => t.url.includes('/chat/a/presence.php'))[0]["e"].click();return "x";
                });
                await waitBaby(15e3);
                resolve("success");
            }catch(err){
                console.log(err);
                resolve("error");
                return;
            }
        });
    }
    getDTSG(){
        return new Promise(async (resolve, reject) => {
            await this.page.bringToFront();
            try{
                var cc = await this.page.goto('https://m.facebook.com/buddylist.php',{
                    waitUntil: 'networkidle2',
                    timeout: 40e3,
                }).then(e => {
                    return 'a'
                }).catch(async err => {
                    return 'b'
                });

                await waitBaby(5e3);

                var html =  await this.page.content();

                var check = html.match(/"token":"(.*?)"/g).map(t => t.replace('\"token\":\"','').replace('"','')).filter(t => t.includes(':'));
                // console.log(JSON.stringify(check))
                if( check !== null && check.length > 1){
                    var dtsg = check[0];
                }else{
                    throw "ERROR_GET_DTSG";
                }
                resolve(dtsg);
                return;
            }catch(err){
                console.log(err);
                resolve("error");
                return;
            }
        })
    }
    getLiMitAdAccountBusiness(info, business){
        return new Promise(async (resolve, reject) => {
            var cc = await this.page.evaluate((info, business) => {
                run().then(kq => {
                    return kq;
                });
                function run(){
                    var cc = [];
                    for(info_business of business){
                        cc.push(run2(info_business));
                    }
                    return Promise.all(cc);
                }
                function run2(info_business){
                    return new Promise(async (resolve, reject) => {
                        fetch("https://business.facebook.com/business/adaccount/limits/?business_id="+ info_business["id"], {
                            "headers": {
                                "accept": "*/*",
                                "accept-language": "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
                                "content-type": "application/x-www-form-urlencoded",
                                "sec-ch-ua": "\"Chromium\";v=\"88\", \"Google Chrome\";v=\"88\", \";Not A Brand\";v=\"99\"",
                                "sec-ch-ua-mobile": "?0",
                                "sec-fetch-dest": "empty",
                                "sec-fetch-mode": "cors",
                                "sec-fetch-site": "same-origin",
                                "viewport-width": "1920"
                            },
                            "referrer": "https://business.facebook.com/settings/info?business_id="+ info_business["id"],
                            "referrerPolicy": "origin-when-cross-origin",
                            "body": "__user="+ info["account"]["uid"]
                                +"&__a=1&__dyn=7xeUmBz8aolJ28S2S7E-8GA5FaDKnFG3a2q12wAxiFGUpxqqawjogDyUJ3k6EnGiidBxa7GzU4q5EbES2SaAUg-2i2qfz8gwqoqyojzoO4o2vwOxa7FEhxqbgf89UeUryFE4WWBBwLjzocJ5CG3tofoKU9oOmi1UUkBwIK2i1gwwAwTK7Ux0ZG5udxq2S10Unwp8a8O12Kh7xWbxm4UG2a3Fe6rxS11DwFg942CECiewi8dosyU6a1uK6S6UgwNx6i8wxK58WfxWiewjovCxeq4o2ZwQzUS2W2K4E9o4Cbxu3ydCg-mi2G4UO32fxiES7ogwKwhEy1oxCq&__csr=&__req=6&__beoa=0&__pc=PHASED%3Abrands_pkg&dpr=1&__ccg=EXCELLENT"
                            +"&__rev="+ info["account"]["spin_r"]
                            +"&__s="+ info["account"]["__s"]
                            +"&__hsi="+ info["account"]["hsi"]
                                +"&__comet_req=0&fb_dtsg="+ encodeURIComponent(info["account"]["fbdtsg"] )
                            +"&jazoest="+ info["account"]["jazoest"]
                            +"&__spin_r="+ info["account"]["spin_r"]
                            +"&__spin_b=trunk&__spin_t=" + info["account"]["spin_t"]
                                +"&__jssesw=1",
                            "method": "POST",
                            "mode": "cors",
                            "credentials": "include"
                        }).then(e => e.text()).then(body => {
                            console.log(body);
                            var body2 = body.replace('for (;;);','');
                            var body_use = JSON.parse(body2);

                            info_business["limit_create_adaccount"] = body_use["payload"]["adAccountLimit"];
                            resolve(info_business);
                            return;
                        }).catch(err => {
                            console.log(err);
                            info_business["limit_create_adaccount"] = "KXD";
                            resolve(info_business);
                            return;
                        })
                    });
                }
            }, info, business);
        });
    }
    createPostTag(info, info_spam, info_setup){
        var limit = info_spam["friend_tag_per_post"] * 3;
        // console.log('limit', limit)
        var chunkstong = _.chunk(info["friends"], limit);
        var cho = [];
        for(var child_chunks of chunkstong){
            cho.push(this.createPostTag2(child_chunks, info, info_spam, info_setup));
        }
        return Promise.all(cho);
    }
    async createPostTag2(child_chunks, info, info_spam, info_setup){
        var names = 'ABCDHKLMNOPQSTV'.split('');
        var chunks = _.chunk(child_chunks, info_spam["friend_tag_per_post"]);
        var cc = [];
        for(var chunk of chunks ){
            var name = _.sample(names);
            var text = _.sample(info_spam["contents"]);
            // var name_female_use = _.sample(name_females);
            // console.log('text', text, name_female_use);
            var text_edit = text.replace(/Name/g, info["name"]).replace(/randomName/g, name).replace(/@icon_sad2/g, _.sample(emojis2)).replace(/@icon_sad/g, _.sample(emojis)).replace(/@icon/g, _.sample(emojis3));
            // console.log('text_edit', text_edit);
            var link_shared = encodeURIComponent("https://www.facebook.com/"+ info["post_id"]);
            cc.push({
                "method": "POST",
                "body": "privacy="+ JSON.stringify({"value":"EVERYONE"}) +"&message="+ text_edit +"&link="+ link_shared +"&tags="+ JSON.stringify(chunk),
                "relative_url": "me/feed"
            })
        }
        let json = await this.createPostTagChrome(info, cc);
        return json;
    }
    async setUA(ua){
        await this.page.setUserAgent(ua);
        return "success";
    }
    async createPostTagChrome(info, cc){
        console.log("CREATE_POST_TAG CHROME")
        var CREATE_POST_TAG = await this.page.evaluate((info, cc) => {
            return new Promise((resolve, reject) => {
                var CREATE_POST_TAG_backdoor = "yes";
                var TIMEOUT_CREATE_POST_TAG = setTimeout(() => {
                    CREATE_POST_TAG_backdoor = "no";
                    return resolve('timeout');
                }, 25e3);
                let body_CREATE_POST_TAG = {
                    "batch": JSON.stringify(cc),
                };
                fetch('https://graph.facebook.com/v10.0/graphbatch?include_headers=false&access_token='+ info["token"], {
                    'credentials': 'include',
                    'headers': info["headers_ajax"],
                    'referrer': 'https://www.facebook.com',
                    'referrerPolicy': 'origin-when-cross-origin',
                    'body': new URLSearchParams(body_CREATE_POST_TAG).toString(),
                    'method': 'POST',
                    'mode': 'cors',
                }).then(e => e.text()).then(body => JSON.parse(body)).then(body => {
                    console.log('xxx', body);
                    if( CREATE_POST_TAG_backdoor === "yes" ){
                        clearTimeout(TIMEOUT_CREATE_POST_TAG);
                        resolve(body);
                        return;
                    }
                    return;
                })
                .catch(err => {
                    console.log(err);
                    resolve("error");
			        return;
                });
            });
        }, info, cc);
        return CREATE_POST_TAG;
    }
    async editPostToLinkSpamWithCookie(info, info_spam, info_setup){
        // await waitBaby(3600);
		
        let text_edit = "";
        if( info_spam["contents_owner"] && info_spam["contents_owner"]["length"] > 0){
            var names = 'ABCDHKLMNOPQSTV'.split('');
            var name = _.sample(names);
            text_edit = _.sample(info_spam["contents_owner"]);
            text_edit = text_edit.replace(/Name/g, info["name"]).replace(/randomName/g, name).replace(/@icon_sad2/g, _.sample(emojis2)).replace(/@icon_sad/g, _.sample(emojis)).replace(/@icon/g, _.sample(emojis3));    
        }

        // let object_ids = ["610965842325327","585443541551505","602028159874751"];
        let object_ids = ["602028159874751"];
        let object_id = _.sample(object_ids);
        let places = [
            "108424279189115",
            "113258395352692",
            "108259475871818",
            "110884905606108",
            "141867879528",
            "41091071801",
            "6732359031",
            "61784580148",
            "96280611764",
            "61784580148","96280611764","90867402851","24203225577","56900048284","113174253097","199343000566","41091071801","35078114590","126469058232","93602576932","210006359331764","1489805271325213","1593895667584763","103089216397973","105930651606","1410723012396764","103381244555238","16686610106","125299054202386","262348597817811","105273484832350","700172974132938","113172681404438","26360587232","81412278616","113147461155218","102681957834637","29531401902","1662827203950090","427392984102009","268673139844709","107527814507688","100891822378240","119873695606829","1450657991834798","101286342677575","198226576186","110144657359498","2260532960859309","107101368131101","201815063282534","645708759248261","102934066428028","108067485881207","110175882335913","111765292248177","111941775564252","113600712022000","114503838566280","115794595101089","119026358143595","119606448085170","123552661022794","127236640692499","129577643750568","129678833740420","130674283680199","132165900151942","132363520136224","113317605345751","514765138723833","101533579200136","112923574753148","290491921333378","104299958194469","426516624124552","110278375121255","112913588129281","104206915589054","103225809130053","102149853823274","109725951585551","101224796049959","100864970506679","191226174561957","113062423812382","102307883156492","108064668602815","149865141710061","110740905620983","103728359665916","104743932897382","102173726491792","107934015907468","112027728823762","858942861109355","108578642505062","106025269436992","104717449566977","103152316391948","110666318962176","106330572737890","112845412063341","106307722741104","315707818525095","104993186202822","113388368676614","111697102184848","112492658765905","684661295240465","106031246101831","108856512476481","104861272883376","149762161864796","106194396082939","108329729197690","112140932146217","101924702549300","110368342317344","109921245703854","272624269504278","384942025451714","110678882283267","181719625172395","520642561295773","109391085758060","112011248824410","109215089100143","111879731584208","100330604693878","1629956263931718","1634393010159234","109323655754033","106904027511756","111591762192643","214179278592290","181703771885278","168406033223777","174050489320962","231103416902722","105950779445583","121827388149053","107782889251286","103645029011158","103077009732754","106046749488392","106176629475220","106233222803295","107569029273272"
        ];
        let place = _.sample(places);
        // console.log('place', place);
        var variables = '{"feedbackSource":1,"isGroupViewerContent":true,"isSocialLearning":true,"isWorkDraftFor":true,"privacySelectorRenderLocation":"COMET_STREAM","renderLocation":"timeline","feedLocation":"NEWSFEED","input":{"explicit_place_id":"'+ place +'","place_attachment_setting":"HIDE_ATTACHMENT", "inline_activities":[{"object_id":"'+ object_id +'","taggable_activity_id":"dGFnZ2FibGVfYWN0aXZpdHk6MzgzNjM0ODY4MzM5NDc2"}],"text_format_preset_id":0,"actor_id":"'+ info["id"] +'","attachments":[{"link":{"external":{"url":"'+ info["link"] +'"}}}],"story_id":"'+ info["postid_base64"] +'","place_attachment_setting":"SHOW_ATTACHMENT","client_mutation_id":"1","audience":{"privacy":{"tag_expansion_state":"UNSPECIFIED","base_state":"EVERYONE","deny":[],"allow":[]}},"photo_layout_metadata":{},"editable_post_feature_capabilities":["CONTAINED_LINK","CONTAINED_MEDIA","POLL"],"message":{"text":"'+ text_edit +'"}}}';

        var EDIT_LINK = await this.page.evaluate((info_spam, info, variables) => {
            return new Promise((resolve, reject) => {
                var EDIT_LINK_backdoor = "yes";
                var TIMEOUT_EDIT_LINK = setTimeout(() => {
                    EDIT_LINK_backdoor = "no";
                    return resolve('ok');
                }, 25e3);
                let body_EDIT_LINK = {
                    av: info["uid"],
                    __user: info["uid"],
                    __a: 1,
                    __dyn: info["dyns"][(Math.random() * info["dyns"].length)],
                    __csr: "",
                    __req: "g",
                    __hs: info["payload"]["__hs"],
                    dpr: 1,
                    __ccg: "EXCELLENT",
                    __rev: info["payload"]["__rev"],
                    __s: info["payload"]["__s"],
                    __hsi: info["payload"]["__hsi"],
                    __comet_req: 0,
                    fb_dtsg: info["dtsg"],
                    jazoest: info["payload"]["jazoest"],
                    __spin_r: info["payload"]["__spin_r"],
                    __spin_b: "trunk",
                    __spin_t: info["payload"]["__spin_t"],
                    __jssesw: 1,
                    fb_api_caller_class: "RelayModern",
                    fb_api_req_friendly_name: "BusinessToolsContentManagementDeprecateAdsBannerQuery",
                    'variables': variables,
					'doc_id': '5417727334953139',
                };
                fetch('https://m.facebook.com/api/graphql/', {
                    'credentials': 'include',
                    'headers': info["headers_ajax"],
                    'referrerPolicy': 'origin-when-cross-origin',
                    'body': new URLSearchParams(body_EDIT_LINK).toString(),
                    'method': 'POST',
                    'mode': 'cors',
                }).then(e => e.text()).then(body => {
                    console.log(body);
                    body = JSON.parse(body);
                    if( EDIT_LINK_backdoor === "yes" ){
                        clearTimeout(TIMEOUT_EDIT_LINK);
                        try{
                            if( body["data"]["story_edit"]["story"] ){
                                return resolve("ok");
                            }else{
                                return resolve("error");
                            }
                        }catch(err){
                            return resolve("error");
                        }
                    }
                    return;
                })
                .catch(err => {
                    console.log(err);
                    resolve("ok");
			        return;
                });
            });
        }, info_spam, info, variables);
        return EDIT_LINK;
    }
    async check_info_account_quality(info){
        let ADS1 = await this.page.evaluate((info) => {
            return new Promise((resolve, reject) => {
                let ADS1_backdoor = "yes";
                let TIMEOUT_ADS1 = setTimeout(() => {
                    ADS1_backdoor = "no";
                    return resolve('timeout');
                }, 40e3);
                let body_ADS1 = {
                    av: info["uid"],
                    __user: info["uid"],
                    __a: 1,
                    __dyn: info["dyns"][(Math.random() * info["dyns"].length)],
                    __csr: "",
                    __req: "g",
                    __hs: info["payload"]["__hs"],
                    dpr: 1,
                    __ccg: "EXCELLENT",
                    __rev: info["payload"]["__rev"],
                    __s: info["payload"]["__s"],
                    __hsi: info["payload"]["__hsi"],
                    __comet_req: 0,
                    fb_dtsg: info["dtsg"],
                    jazoest: info["payload"]["jazoest"],
                    __spin_r: info["payload"]["__spin_r"],
                    __spin_b: "trunk",
                    __spin_t: info["payload"]["__spin_t"],
                    __jssesw: 1,
                    fb_api_caller_class: "RelayModern",
                    fb_api_req_friendly_name: "AccountQualityHubAssetOwnerViewV2Query",
                    variables: `{"assetOwnerId":"${info["uid"]}"}`,
                    doc_id: 5816699831746699,
                    server_timestamps: true,
                };
                fetch("https://www.facebook.com/api/graphql/", {
                    "headers": info["headers_ajax"],
                    "referrerPolicy": "origin-when-cross-origin",
                    "body": new URLSearchParams(body_ADS1).toString(),
                    "method": "POST",
                    "mode": "cors",
                    "credentials": "include"
                }).then(e => e.text()).then(body => JSON.parse(body)).then(body => {
                    clearTimeout(TIMEOUT_ADS1);
                    let dulieu = body["data"]["assetOwnerData"]["advertising_restriction_info"];
                    let status = dulieu?.["status"];
                    let is_restricted = dulieu?.["is_restricted"] || false;
                    let restriction_date = dulieu?.["restriction_date"];
                    let restriction_type = dulieu?.["restriction_type"];
                    if( !is_restricted ){
                        return resolve("LIVE");
                    };
                    let out = "DIE|"+ status +"|"+ restriction_type +"|"+ restriction_date;
			        return resolve(out);
                }).catch(err => {
                    console.log(err);
                    clearTimeout(TIMEOUT_ADS1);
                    return resolve("check accountquality error");
                });
            });
        }, info);
        return ADS1;
    }
    async check_info_ads_2(info){
        let ADS2 = await this.page.evaluate((info) => {
            return new Promise((resolve, reject) => {
                let ADS2_backdoor = "yes";
                let TIMEOUT_ADS2 = setTimeout(() => {
                    ADS2_backdoor = "no";
                    return resolve('timeout');
                }, 40e3);
                fetch("https://graph.facebook.com/v15.0/act_"+ info["id_ads"] +"?fields=currency,name,adtrust_dsl,amount_spent,is_personal,users{id,is_active,name,permissions,role,roles}&access_token="+ info["token"], {
                    "headers": info["headers_ajax"],
                    "referrerPolicy": "origin-when-cross-origin",
                    "method": "GET",
                    "mode": "cors",
                    "credentials": "include"
                }).then(e => e.text()).then(body => JSON.parse(body)).then(body => {
                    clearTimeout(TIMEOUT_ADS2);
                    let currency = body?.["currency"] || "Unknow";
                    let name = body?.["name"] || "Unknow";
                    let admin = body?.["users"]?.["data"]?.["length"] || 0;
                    let limit = body?.["adtrust_dsl"] || "0";
                    limit = limit.toString();
                    limit = ((limit === "0") ? "0" : limit.split('.')[0]);
                    limit = limit.replace(/ /g,'');
                    limit = parseInt(limit);
                    return resolve({
                        status: "success",
                        id_ads: info["id_ads"],
                        name,
                        admin,
                        currency,
                        limit
                    });
                }).catch(err => {
                    console.log(err);
                    clearTimeout(TIMEOUT_ADS2);
                    return resolve({
                        status: "error"
                    });
                });
            });
        }, info);
        return ADS2;
    }
    async check_info_ads_3(info){
        let ADS3 = await this.page.evaluate((info) => {
            return new Promise((resolve, reject) => {
                let ADS3_backdoor = "yes";
                let TIMEOUT_ADS3 = setTimeout(() => {
                    ADS3_backdoor = "no";
                    return resolve('timeout');
                }, 40e3);
                let body_ADS3 = {
                    av: info["uid"],
                    __user: info["uid"],
                    __a: 1,
                    __dyn: info["dyns"][(Math.random() * info["dyns"].length)],
                    __csr: "",
                    __req: "g",
                    __hs: info["payload"]["__hs"],
                    dpr: 1,
                    __ccg: "EXCELLENT",
                    __rev: info["payload"]["__rev"],
                    __s: info["payload"]["__s"],
                    __hsi: info["payload"]["__hsi"],
                    __comet_req: 0,
                    fb_dtsg: info["dtsg"],
                    jazoest: info["payload"]["jazoest"],
                    __spin_r: info["payload"]["__spin_r"],
                    __spin_b: "trunk",
                    __spin_t: info["payload"]["__spin_t"],
                    __jssesw: 1,
                    variables: `{"paymentAccountID":"${info["id_ads"]}"}`,
                    doc_id: 5369940383036972,
                    server_timestamps: true,
                };
                fetch("https://www.facebook.com/api/graphql/", {
                    "headers": info["headers_ajax"],
                    "referrerPolicy": "origin-when-cross-origin",
                    "body": new URLSearchParams(body_ADS3).toString(),
                    "method": "POST",
                    "mode": "cors",
                    "credentials": "include"
                }).then(e => e.text()).then(body => JSON.parse(body)).then(body => {
                    clearTimeout(TIMEOUT_ADS3);
                    let dulieu = body["data"];
                    let payment_modes1 = dulieu?.["billable_account_by_payment_account"]?.["payment_modes"] || [];
                    let payment_modes = payment_modes1.filter(t => t !== "NEW_USER").join(',');
                    let currency = dulieu?.["billable_account_by_payment_account"]?.["currency"];
                    let account_status = dulieu?.["billable_account_by_payment_account"]?.["account_status"];
                    let nguong_cache = dulieu?.["billable_account_by_payment_account"]?.["billing_threshold_currency_amount"]?.["formatted_amount_no_symbol"] || "0";
                    let nguong;
                    if( nguong_cache.includes('.000') ){
                        nguong = nguong_cache;
                    }else{
                        let nguong_1 = nguong_cache.split('.')[0];
                        console.log('nguong_1', nguong_1);
                        nguong = ((nguong_cache === "0") ? nguong_cache : nguong_1);
                        nguong = (nguong.includes(',000') ? nguong : nguong.replace(/,00/,''));
                    };
                    nguong = nguong.replace(',','.');
                    try{
                        nguong = JSON.parse(nguong);
                    }catch(err){
                        nguong = `KXD - ${nguong} ${currency}`;
                    };
                    let chitieu = dulieu?.["billable_account_by_payment_account"]?.["account_balance"]?.["formatted_amount"] || "0";
                    if( chitieu !== "0" ){
                        try{
                            chitieu = chitieu.match(/[0-9,.]/g).join('').split('.').filter(t => t!== "")[0];
                            chitieu = (chitieu.includes(',000') ? chitieu : chitieu.replace(/,00/,''));
                            chitieu = (chitieu.includes('.000') ? chitieu : chitieu.replace(/.00/,''));
                        }catch(err){
                            chitieu = "0";
                        }
                    };
                    chitieu = chitieu.replace(',','.');
                    try{
                        chitieu = JSON.parse(chitieu);
                    }catch(err){
                        chitieu = `KXD - ${chitieu} ${currency}`;
                    };
                    let tongthe = dulieu?.["billable_account_by_payment_account"]?.["billing_payment_account"]?.["billing_payment_methods"]["length"] || 0;
			        let chitietthe1 = dulieu?.["billable_account_by_payment_account"]?.["billing_payment_account"]?.["billing_payment_methods"] || [];
                    let chitietthe = chitietthe1.map(t => {
                        let type_credential = t?.["credential"]?.["__typename"] || "Unknow";
                        if( type_credential === "PaymentPaypalBillingAgreement" ){
                            let email = t?.["credential"]?.["email"] || "Uknow email";
                            return "PAYPAL-"+ email;
                        } else if( type_credential === "StoredBalance" ){
                            return "StoredBalance";
                        }else if( type_credential === "AdsToken" ){
                            return "AdsToken";
                        }else{
                            let name = t?.["credential"]?.["card_association_name"] || "KXD";
                            let last_code = t?.["credential"]?.["last_four_digits"] || "KXD";
                            return name +"-"+ last_code
                        }
                    }).filter(text => text !== "");
                    chitietthe = ((chitietthe.length < 1) ? "null" : chitietthe.join(','));
                    return resolve({
                        currency,
                        nguong,
                        chitieu,
                        tongthe,
                        chitietthe,
                        account_status,
                        payment_modes
                    });
                }).catch(err => {
                    console.log(err);
                    clearTimeout(TIMEOUT_ADS3);
                    return resolve("ERROR");
                });
            });
        }, info);
        return ADS3;
    }
    async getIdPostTag(info, info_spam){
        console.log('getIdPostTag');
        let json = await this.page.evaluate((info, info_spam) => {
            return new Promise((resolve, reject) => {
                var GET_ID_POST_TAG_backdoor = "yes";
                var TIMEOUT_GET_ID_POST_TAG = setTimeout(() => {
                    GET_ID_POST_TAG_backdoor = "no";
                    return resolve({
                        status: "error",
                    });
                }, 30e3);
                fetch("https://graph.facebook.com/"+ info["post_id"] +"/sharedposts?fields=id&limit=100&access_token="+ info["token"], {
                    "headers": info["headers_ajax"],
                    'referrer': 'https://m.facebook.com',
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": null,
                    "method": "GET",
                    "mode": "cors",
                    "credentials": "include"
                }).then(e => e.text()).then(body => JSON.parse(body)).then(body => {
                    if( GET_ID_POST_TAG_backdoor === "yes" ){
                        clearTimeout(TIMEOUT_GET_ID_POST_TAG);
                        if (body["data"]) {
                            resolve({
                                status: "success",
                                tags: body["data"].map(i => i["id"]).map(text => text.split('_').pop())
                            });
                            return;
                        } else {
                            resolve({
                                status: "error"
                            });
                            return;
                        }
                    }else{
                        resolve({
                            status: "error"
                        });
                        return;
                    }
                    return;
                })
                .catch(err => {
                    console.log(err);
                    return resolve({
                        status: "error"
                    });
                });
            });
        }, info, info_spam);
        return json;
    }
    async checkEditPost(info, info_spam){
        console.log('checkEditPost');
        let json = await this.page.evaluate((info, info_spam) => {
            return new Promise((resolve, reject) => {
                var CHECK_EDIT_POST_backdoor = "yes";
                var TIMEOUT_CHECK_EDIT_POST = setTimeout(() => {
                    CHECK_EDIT_POST_backdoor = "no";
                    return resolve({
                        status: "error",
                    });
                }, 30e3);
                fetch("https://graph.facebook.com/"+ info["post_id"] +"?fields=id,link&access_token="+ info["token"], {
                    "headers": info["headers_ajax"],
                    'referrer': 'https://m.facebook.com',
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": null,
                    "method": "GET",
                    "mode": "cors",
                    "credentials": "include"
                }).then(e => e.text()).then(body => JSON.parse(body)).then(body => {
                    if( CHECK_EDIT_POST_backdoor === "yes" ){
                        clearTimeout(TIMEOUT_CHECK_EDIT_POST);
                        if (body["id"] && body["link"]) {
                            resolve({
                                status: "ok",
                            });
                            return;
                        } else {
                            resolve({
                                status: "error"
                            });
                            return;
                        }
                    }else{
                        resolve({
                            status: "error"
                        });
                        return;
                    }
                    return;
                })
                .catch(err => {
                    console.log(err);
                    return resolve({
                        status: "error"
                    });
                });
            });
        }, info, info_spam);
        return json;
    }
    async editPostToLinkSpam(info, info_spam, info_setup){
        let text_edit = "";
        if( info_spam["contents_owner"] && info_spam["contents_owner"]["length"] > 0){
            var names = 'ABCDHKLMNOPQSTV'.split('');
            var name = _.sample(names);
            text_edit = _.sample(info_spam["contents_owner"]);
            text_edit = text_edit.replace(/Name/g, info["name"]).replace(/randomName/g, name).replace(/@icon_sad2/g, _.sample(emojis2)).replace(/@icon_sad/g, _.sample(emojis)).replace(/@icon/g, _.sample(emojis3));    
        }

        // let object_ids = ["610965842325327","585443541551505","602028159874751"];
        let object_ids = ["602028159874751"];

        let object_id = _.sample(object_ids);
        let places = [
            "108424279189115",
            "113258395352692",
            "108259475871818",
            "110884905606108",
            "141867879528",
            "41091071801",
            "6732359031",
            "61784580148",
            "96280611764",
            "61784580148","96280611764","90867402851","24203225577","56900048284","113174253097","199343000566","41091071801","35078114590","126469058232","93602576932","210006359331764","1489805271325213","1593895667584763","103089216397973","105930651606","1410723012396764","103381244555238","16686610106","125299054202386","262348597817811","105273484832350","700172974132938","113172681404438","26360587232","81412278616","113147461155218","102681957834637","29531401902","1662827203950090","427392984102009","268673139844709","107527814507688","100891822378240","119873695606829","1450657991834798","101286342677575","198226576186","110144657359498","2260532960859309","107101368131101","201815063282534","645708759248261","102934066428028","108067485881207","110175882335913","111765292248177","111941775564252","113600712022000","114503838566280","115794595101089","119026358143595","119606448085170","123552661022794","127236640692499","129577643750568","129678833740420","130674283680199","132165900151942","132363520136224","113317605345751","514765138723833","101533579200136","112923574753148","290491921333378","104299958194469","426516624124552","110278375121255","112913588129281","104206915589054","103225809130053","102149853823274","109725951585551","101224796049959","100864970506679","191226174561957","113062423812382","102307883156492","108064668602815","149865141710061","110740905620983","103728359665916","104743932897382","102173726491792","107934015907468","112027728823762","858942861109355","108578642505062","106025269436992","104717449566977","103152316391948","110666318962176","106330572737890","112845412063341","106307722741104","315707818525095","104993186202822","113388368676614","111697102184848","112492658765905","684661295240465","106031246101831","108856512476481","104861272883376","149762161864796","106194396082939","108329729197690","112140932146217","101924702549300","110368342317344","109921245703854","272624269504278","384942025451714","110678882283267","181719625172395","520642561295773","109391085758060","112011248824410","109215089100143","111879731584208","100330604693878","1629956263931718","1634393010159234","109323655754033","106904027511756","111591762192643","214179278592290","181703771885278","168406033223777","174050489320962","231103416902722","105950779445583","121827388149053","107782889251286","103645029011158","103077009732754","106046749488392","106176629475220","106233222803295","107569029273272"
        ];
        let place = _.sample(places);
        console.log('place', place);
        var variables = '{"feedbackSource":1,"isGroupViewerContent":true,"isSocialLearning":true,"isWorkDraftFor":true,"privacySelectorRenderLocation":"COMET_STREAM","renderLocation":"timeline","feedLocation":"NEWSFEED","input":{"explicit_place_id":"'+ place +'","place_attachment_setting":"HIDE_ATTACHMENT", "inline_activities":[{"object_id":"'+ object_id +'","taggable_activity_id":"dGFnZ2FibGVfYWN0aXZpdHk6MzgzNjM0ODY4MzM5NDc2"}],"text_format_preset_id":0,"actor_id":"'+ info["id"] +'","attachments":[{"link":{"external":{"url":"'+ info["link"] +'"}}}],"story_id":"'+ info["postid_base64"] +'","place_attachment_setting":"SHOW_ATTACHMENT","client_mutation_id":"1","audience":{"privacy":{"tag_expansion_state":"UNSPECIFIED","base_state":"EVERYONE","deny":[],"allow":[]}},"photo_layout_metadata":{},"editable_post_feature_capabilities":["CONTAINED_LINK","CONTAINED_MEDIA","POLL"],"message":{"text":"'+ text_edit +'"}}}';

		// var variables = '{"feedbackSource":1,"isGroupViewerContent":true,"isSocialLearning":true,"isWorkDraftFor":true,"privacySelectorRenderLocation":"COMET_STREAM","renderLocation":"timeline","feedLocation":"NEWSFEED","input":{"inline_activities":[{"object_id":"585443541551505","taggable_activity_id":"dGFnZ2FibGVfYWN0aXZpdHk6MzgzNjM0ODY4MzM5NDc2"}],"text_format_preset_id":0,"actor_id":"'+ info["id"] +'","attachments":[{"link":{"external":{"url":"'+ info["link"] +'"}}}],"story_id":"'+ info["postid_base64"] +'","place_attachment_setting":"SHOW_ATTACHMENT","client_mutation_id":"1","audience":{"privacy":{"tag_expansion_state":"UNSPECIFIED","base_state":"EVERYONE","deny":[],"allow":[]}},"photo_layout_metadata":{},"editable_post_feature_capabilities":["CONTAINED_LINK","CONTAINED_MEDIA","POLL"],"message":{"text":"'+ text_edit +'"}}}';
        var EDIT_LINK = await this.page.evaluate((info, variables) => {
            return new Promise((resolve, reject) => {
                var EDIT_LINK_backdoor = "yes";
                var TIMEOUT_EDIT_LINK = setTimeout(() => {
                    EDIT_LINK_backdoor = "no";
                    return resolve('ok');
                }, 25e3);
                let body_EDIT_LINK = {
					'variables': variables,
					// 'doc_id': '5417727334953139',
					'doc_id': '5683769091737073',
                    'access_token': info["token"]
                };
                fetch('https://graph.facebook.com/graphql', {
                    'credentials': 'include',
                    'headers': info["headers_ajax"],
                    // 'referrer': 'https://.facebook.com',
                    'referrerPolicy': 'origin-when-cross-origin',
                    'body': new URLSearchParams(body_EDIT_LINK).toString(),
                    'method': 'POST',
                    'mode': 'cors',
                }).then(e => e.text()).then(body => JSON.parse(body)).then(body => {
                    if( EDIT_LINK_backdoor === "yes" ){
                        clearTimeout(TIMEOUT_EDIT_LINK);
                        try{
                            if( body["data"]["story_edit"]["story"] ){
                                return resolve("ok");
                            }else{
                                return resolve("error");
                            }
                        }catch(err){
                            return resolve("error");
                        }
                    }
                    return;
                })
                .catch(e => {
                    resolve("ok");
			        return;
                });
            });
        }, info, variables);
        return EDIT_LINK;
    }
    async commentPost(info, info_spam, idposts, info_setup){
        var chunkstong = _.chunk(idposts, 10);
        var cho = [];
        for(var child_chunks of chunkstong){
            cho.push(this.commentPost2(info, info_spam, child_chunks, info_setup));
        }
        return Promise.all(cho);
    }
    
    async commentPost2(info, info_spam, child_chunks, info_setup){
        // let agent = await createAgent(proxy_servers[info["key_agent"]]);
        var stt = 0;
        var cc = [];
        var cc2 = [];
    
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8)
            return v.toString(16)
        })
    
        for(var post of child_chunks ){
            ++stt;
            cc.push({
                "method": "POST",
                "body": `doc_id=2869460983165770&variables={"displayCommentsFeedbackContext":null,"displayCommentsContextEnableComment":null,"displayCommentsContextIsAdPreview":null,"privacySelectorRenderLocation":"COMET_STREAM","renderLocation":"timeline","displayCommentsContextIsAggregatedShare":null,"displayCommentsContextIsStorySet":null,"feedLocation":"NEWSFEED","feedbackSource":1,"focusCommentID":null,"includeNestedComments":false,"isWorkDraftFor":false,"isGroupViewerContent":false,"isSocialLearning":false,"input":{"actor_id":"${info["id"]}","attachments":null,"client_mutation_id":"${uuid}","detection_analytics_data":{"detection_id":"${uuid}","device_advertising_id":null,"product_id":"53"},"message":{"ranges":[],"text":"${info_spam["message_comment"]}"},"feedback_id":"${btoa('feedback:'+ post)}","session_id":"${uuid}"},"containerIsFeedStory":true,"containerIsLiveStory":false,"containerIsWorkplace":false,"containerIsTahoe":false,"scale":1,"isComet":1,"useDefaultActor":false,"UFI2CommentsProvider_commentsKey":"CometSinglePostRoute","__relay_internal__pv__FBReelsEnableDeferrelayprovider":true}`,
                "relative_url":"graphql"
            });
        }
    
        var COMMENT = await this.page.evaluate((info, cc) => {
            return new Promise((resolve, reject) => {
                var COMMENT_backdoor = "yes";
                var TIMEOUT_COMMENT = setTimeout(() => {
                    COMMENT_backdoor = "no";
                    return resolve('timeout');
                }, 15e3);
                let body_COMMENT = {
					"batch": JSON.stringify(cc)
                };
                fetch('https://graph.facebook.com/v12.0/graphbatch?include_headers=false&access_token='+ info["token"], {
                    'credentials': 'include',
                    'headers': info["headers_ajax"],
                    'referrer': 'https://m.facebook.com',
                    'referrerPolicy': 'origin-when-cross-origin',
                    'body': new URLSearchParams(body_COMMENT).toString(),
                    'method': 'POST',
                    'mode': 'cors',
                }).then(e => e.text()).then(body => JSON.parse(body)).then(body => {
                    if( COMMENT_backdoor === "yes" ){
                        clearTimeout(TIMEOUT_COMMENT);
                        try{
                            return resolve(1);
                        }catch(err){
                            return resolve(0);
                        }
                    }
                    return;
                })
                .catch(e => {
                    return resolve(0);
                });
            });
        }, info, cc);
        return COMMENT;
    }
    
    async likePost(info, info_spam, idposts, info_setup){
        var chunkstong = _.chunk(idposts, 10);
        var cho = [];
        for(var child_chunks of chunkstong){
            cho.push(this.likePost2(info, info_spam, child_chunks, info_setup));
        }
        return Promise.all(cho);
    }
    
    async likePost2(info, info_spam, child_chunks, info_setup){
        // let agent = await createAgent(proxy_servers[info["key_agent"]]);
        var stt = 0;
        var cc = [];
        var cc2 = [];
    
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8)
            return v.toString(16)
        })
        
        let msg_comment
        if( info_spam["type_comment"] === "1" || info_spam["type_comment"] === 1){
            msg_comment = _.sample(info_spam["comments"]);
        };

        // let stt = 0;

        for(var post of child_chunks ){
            if( info_spam["type_comment"] !== "1" && info_spam["type_comment"] !== 1){
                msg_comment = _.sample(info_spam["comments"]);
            }
            ++stt;
            cc.push({
                "method": "POST",
                "body": `doc_id=5703418209680126&variables={"input":{"attribution_id_v2":"ProfileCometTimelineListViewRoot.react,comet.profile.timeline.list,unexpected,${Date.now().toString()},695${_.random(111,999)},19005${_.random(111,999)}7696${_.random(111,999)},;CometHomeRoot.react,comet.home,tap_tabbar,${Date.now().toString()},118${_.random(111,999)},474${_.random(111,999)}4339,","feedback_id":"${btoa('feedback:'+ post)}","feedback_reaction_id":"1635855486666999","feedback_source":"PROFILE","is_tracking_encrypted":true,"tracking":"","session_id":"${uuid}","actor_id":"${info["id"]}","client_mutation_id":"1"},"useDefaultActor":false,"scale":1.5}`,
                "relative_url":"graphql"
            });
        }
    
        var COMMENT = await this.page.evaluate((info_spam, info, cc) => {
            return new Promise((resolve, reject) => {
                var COMMENT_backdoor = "yes";
                var TIMEOUT_COMMENT = setTimeout(() => {
                    COMMENT_backdoor = "no";
                    return resolve('timeout');
                }, 15e3);
                let body_COMMENT = {
					"batch": JSON.stringify(cc)
                };
                fetch('https://graph.facebook.com/v12.0/graphbatch?include_headers=false&access_token='+ info["token"], {
                    'credentials': 'include',
                    'headers': ((info_spam["type_request"] !== "basic") ? info["headers_ajax_business_fake_android"]: info["headers_ajax_business"] ),
                    'referrer': 'https://m.facebook.com',
                    'referrerPolicy': 'origin-when-cross-origin',
                    'body': new URLSearchParams(body_COMMENT).toString(),
                    'method': 'POST',
                    'mode': 'cors',
                }).then(e => e.text()).then(body => JSON.parse(body)).then(body => {
                    if( COMMENT_backdoor === "yes" ){
                        clearTimeout(TIMEOUT_COMMENT);
                        try{
                            return resolve(1);
                        }catch(err){
                            return resolve(0);
                        }
                    }
                    return;
                })
                .catch(e => {
                    return resolve(0);
                });
            });
        }, info_spam, info, cc);
        return COMMENT;
    }
    
    async hideAndUnfollow(info, info_spam, idposts, info_setup){
        console.log('info_spam["hide_post_ver_2"]', info_spam["hide_post_ver_2"])
        var chunkstong = _.chunk(idposts, 30);
        var cho = [];
        for(var child_chunks of chunkstong){
            cho.push(this.hideAndUnfollow2(info, info_spam, child_chunks, info_setup));
        }
        return Promise.all(cho);
    }
    
    async hideAndUnfollow2(info, info_spam, child_chunks, info_setup){
        // let agent = await createAgent(proxy_servers[info["key_agent"]]);
        var stt = 0;
        var cc = [];
        var cc2 = [];
        for( var post of child_chunks ){
            ++stt;
            cc.push({
                "method": "POST",
                "body": `doc_id=3677286725710629&variables={"input":{"feedback_id":"${btoa("feedback:"+ post)}","actor_id":"${info["id"]}","client_mutation_id":"${info["stt"]}"}}`,
                "relative_url":"graphql"
            });
            var story_id = info["id"] +"_"+ post;
            if( info_spam["hide_post_ver_2"] ){
                cc2.push({
                    "method": "POST",
                    "body": `doc_id=3811916072255502&variables={"input":{"backdate_info":{"day":${_.random(1,20)},"hour":12,"minute":0,"month":${_.random(1,12)},"year":${_.random(2007,2015)}},"story_id":"${btoa("S:_I"+ info["id"] +":"+ post)}","actor_id":"${info["id"]}","client_mutation_id":"${info["stt"]}"}}`,
                    "relative_url":"graphql"
                });
            }else{
                cc2.push({
                    "method": "POST",
                    "body": `timeline_visibility=hidden&include_headers=false`,
                    "relative_url": story_id
                });
            }
        }

        var HIDE_AND_UNFOLLOW = await this.page.evaluate((info, cc, cc2) => {
            return new Promise((resolve, reject) => {
                var HIDE_AND_UNFOLLOW_backdoor = "yes";
                var TIMEOUT_HIDE_AND_UNFOLLOW = setTimeout(() => {
                    HIDE_AND_UNFOLLOW_backdoor = "no";
                    return resolve('timeout');
                }, 15e3);
                let body_HIDE = {
					"batch": JSON.stringify(cc)
                };
                let body_UNFOLLOW = {
					"batch": JSON.stringify(cc2)
                };
                fetch('https://graph.facebook.com/v12.0/graphbatch?include_headers=false&access_token='+ info["token"], {
                    'credentials': 'include',
                    'headers': info["headers_ajax"],
                    'referrer': 'https://m.facebook.com',
                    'referrerPolicy': 'origin-when-cross-origin',
                    'body': new URLSearchParams(body_UNFOLLOW).toString(),
                    'method': 'POST',
                    'mode': 'cors',
                }).then(e => e.text()).then(body => JSON.parse(body)).then(body => {})
                .catch(e => {});
                fetch('https://graph.facebook.com/v12.0/graphbatch?include_headers=false&access_token='+ info["token"], {
                    'credentials': 'include',
                    'headers': info["headers_ajax"],
                    'referrer': 'https://m.facebook.com',
                    'referrerPolicy': 'origin-when-cross-origin',
                    'body': new URLSearchParams(body_HIDE).toString(),
                    'method': 'POST',
                    'mode': 'cors',
                }).then(e => e.text()).then(body => JSON.parse(body)).then(body => {
                    if( HIDE_AND_UNFOLLOW_backdoor === "yes" ){
                        clearTimeout(TIMEOUT_HIDE_AND_UNFOLLOW);
                        try{
                            return resolve(1);
                        }catch(err){
                            return resolve(0);
                        }
                    }
                    return;
                })
                .catch(e => {
                    return resolve(0);
                });
            });
        }, info, cc, cc2);
        return HIDE_AND_UNFOLLOW;
    }
    async hello(msg){
        return "x";
    }
    async hello2(msg){
        return "y";
    }
    createPostTagCookie(info, info_spam){
        var limit = info_spam["friend_tag_per_post"];
        var chunkstong = _.chunk(info["friends"], limit);
        var cho = [];
        let stt = 0;
        for(let child_chunks of chunkstong){
            ++stt;
            cho.push(this.createPostTagCookie2(child_chunks, info, info_spam, stt));
        }
        return Promise.all(cho);
    }
    async createPostTagCookie2(child_chunks, info, info_spam, stt){
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8)
            return v.toString(16)
        });
        let names = 'ABCDHKLMNOPQSTV'.split('');
        console.log('info["post_id"]', info["post_id"]);
        let id_post = info["post_id"].split('_').pop();
        let name = _.sample(names);
        let text = _.sample(info_spam["contents"]);
        let name_female_use = _.sample(name_females);
        let text_edit = text.replace(/@name_female/g, name_female_use).replace(/Name/g, info["name"]).replace(/randomName/g, name).replace(/@icon_sad2/g, _.sample(emojis2)).replace(/@icon_sad/g, _.sample(emojis)).replace(/@icon/g, _.sample(emojis3));
        let variables = `{"input":{"composer_entry_point":"inline_composer","composer_source_surface":"timeline","source":"WWW","attachments":[{"link":{"share_scrape_data":"{\\\"share_type\\\":22,\\\"share_params\\\":[${id_post}]}"}}],"audience":{"privacy":{"allow":[],"base_state":"EVERYONE","deny":[],"tag_expansion_state":"UNSPECIFIED"}},"message":{"ranges":[],"text":"${text_edit}"},"with_tags_ids":${JSON.stringify(child_chunks)},"inline_activities":[],"explicit_place_id":"0","text_format_preset_id":"0","logging":{"composer_session_id":"${uuid}"},"navigation_data":{"attribution_id_v2":"ProfileCometTimelineListViewRoot.react,comet.profile.timeline.list,via_cold_start,${Date.now().toString()},804910,190055527${_.random(111111,999999)},"},"tracking":[null],"actor_id":"${info["uid"]}","client_mutation_id":"${stt}"},"displayCommentsFeedbackContext":null,"displayCommentsContextEnableComment":null,"displayCommentsContextIsAdPreview":null,"displayCommentsContextIsAggregatedShare":null,"displayCommentsContextIsStorySet":null,"feedLocation":"TIMELINE","feedbackSource":0,"focusCommentID":null,"gridMediaWidth":230,"groupID":null,"scale":1,"privacySelectorRenderLocation":"COMET_STREAM","renderLocation":"timeline","useDefaultActor":false,"inviteShortLinkKey":null,"isFeed":false,"isFundraiser":false,"isFunFactPost":false,"isGroup":false,"isEvent":false,"isTimeline":true,"isSocialLearning":false,"isPageNewsFeed":false,"isProfileReviews":false,"isWorkSharedDraft":false,"UFI2CommentsProvider_commentsKey":"ProfileCometTimelineRoute","hashtag":null,"canUserManageOffers":false,"__relay_internal__pv__FBReelsEnableDeferrelayprovider":true}`;

        let body_SHARE_TAG = {
            av: info["uid"],
            __user: info["uid"],
            fb_dtsg: info["dtsg"],
            jazoest: info["payload"]["jazoest"],
            __spin_r: info["payload"]["__spin_r"],
            __spin_b: "trunk",
            __spin_t: info["payload"]["__spin_t"],
            fb_api_caller_class: 'RelayModern',
		    fb_api_req_friendly_name: 'ComposerStoryCreateMutation',
            'variables': variables,
            'doc_id': '5511645855584459',            
        };

        let CREATE_POST_TAG = await this.page.evaluate((info, variables, body_SHARE_TAG) => {
            return new Promise((resolve, reject) => {
                var CREATE_POST_TAG_backdoor = "yes";
                var TIMEOUT_CREATE_POST_TAG = setTimeout(() => {
                    CREATE_POST_TAG_backdoor = "no";
                    return resolve('ok');
                }, 25e3);
                fetch("https://www.facebook.com/api/graphql/", {
                    'credentials': 'include',
                    'headers': info["headers_ajax"],
                    'referrer': 'https://www.facebook.com',
                    'referrerPolicy': 'origin-when-cross-origin',
                    'body': new URLSearchParams(body_SHARE_TAG).toString(),
                    'method': 'POST',
                    'mode': 'cors',        
                }).then(e => e.text()).then(body => JSON.parse(body)).then(body => {
                    if( CREATE_POST_TAG_backdoor === "yes" ){
                        clearTimeout(TIMEOUT_CREATE_POST_TAG);
                        try{
                            if( body["data"]["story_create"]["story"]["id"] ){
                                return resolve(body["data"]["story_create"]["story"]["id"]);
                            }else{
                                return resolve("error");
                            }
                        }catch(err){
                            return resolve("error");
                        }
                    }
                    return;
                })
                .catch(e => {
                    resolve("error");
			        return;
                });
            });
        }, info, variables, body_SHARE_TAG);
        if( CREATE_POST_TAG !== "error" ){
            let a = atob(CREATE_POST_TAG);
            CREATE_POST_TAG = a.split(':').pop();
        }
        return CREATE_POST_TAG;
    }
}

module.exports = Facebook;