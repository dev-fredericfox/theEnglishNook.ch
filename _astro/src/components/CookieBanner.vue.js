import{r as e,c as t,o as n,t as a,a as i,b as o,d as s,e as l,w as c,v as r,f as d,g as u,h as p}from"../../../vue.v3.2.0-beta.7-6eace22e.js";const g={setup(){const i=e({showCookieNotice:!1}),o=e({functional:!0,analytics:!0}),s={en:{header:"Notice from",title:"This cookie uses websites!",contentList:"<p>One crumb.</p> <p>Two crumbs.</p> <p>Three crumbs.</p> <p>Four!</p>",contentTag:"<p>How many do you want to share?</p>",functional:"functional",analytics:"analytics",selection:"Accept Selection"},de:{header:"Mitteilung von",title:"Dieser Cookie verwendet Webseiten!",contentList:"<p>Ein Krümel.</p> <p>Zwei Krümel.</p> <p>Drei Krümel.</p> <p>Vier!</p>",contentTag:"<p>Wie viele möchten Sie teilen?</p>",functional:"Notwendig",analytics:"Statistiken",selection:"Auswahl zulassen"},fr:{header:"Notification de",title:"Ce cookie utilise des sites Web!",contentList:"<p>Une miette.</p> <p>Deux miettes.</p> <p>Trois miettes.</p> <p>Quatre!</p>",contentTag:"<p>Combien voulez-vous en partager?</p>",functional:"fonctionnel",analytics:"statistiques",selection:"Accepter la sélection"}},l=t((()=>navigator.language.includes("fr")?s.fr:navigator.language.includes("de")?s.de:s.en)),c=function(){if(o.analytics||ookieSetting.analytics){let e=document.createElement("script");e.innerHTML="(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-P56NJDW');",document.head.appendChild(e)}},r=function(){o.analytics&&dataLayer.push({event:"analytics"}),o.analytics&&dataLayer.push({event:"marketing"})};return n((()=>{let e=decodeURIComponent(document.cookie);if(e.includes('cookiePreferences={"functional')){let t=e.split("cookiePreferences=")[1].split(";")[0];t=JSON.parse(t),o.functional=t.functional,o.analytics=t.analytics,c(),r()}else i.showCookieNotice=!0})),{...a(i),...a(o),setSelection:function(){console.log(`triggered SetSelection ${JSON.stringify(o)}`),document.cookie=`cookiePreferences=${JSON.stringify(o)}; Max-Age=7776000`,i.showCookieNotice=!1,c(),r()},bannerContent:s,browserlanguage:l}}},m={key:0,class:"content"},f=o("div",{class:"modal-background"},null,-1),h={class:"modal-card has-text-centered mt-6"},b={class:"modal-card-head"},v={class:"modal-card-title"},w=o("span",{class:"brand-red"},[o("i",null,"The English Nook")],-1),y={class:"modal-card-body"},k={class:"mt-2 mb-2"},T={class:"checkbox mr-2",disabled:""},L={class:"checkbox mr-2"},N={class:"modal-card-foot is-justify-content-center"};function S(e,t){return p(),i("div",null,[e.showCookieNotice?(p(),i("div",m,[o("div",{class:"modal is-active",onWheel:t[4]||(t[4]=u((()=>{}),["prevent"])),onTouchmove:t[5]||(t[5]=u((()=>{}),["prevent"])),onScroll:t[6]||(t[6]=u((()=>{}),["prevent"]))},[f,o("div",h,[o("header",b,[o("h2",v,[s(l(e.browserlanguage.header)+" ",1),w])]),o("section",y,[o("div",null,[o("div",{innerHTML:e.browserlanguage.title},null,8,["innerHTML"]),o("div",{class:"line-height-1 inherit-m-0",innerHTML:e.browserlanguage.contentList},null,8,["innerHTML"]),o("div",{innerHTML:e.browserlanguage.contentTag},null,8,["innerHTML"])]),o("div",k,[o("label",T,[c(o("input",{type:"checkbox",disabled:"","onUpdate:modelValue":t[1]||(t[1]=t=>e.functional=t)},null,512),[[r,e.functional]]),s(" "+l(e.browserlanguage.functional),1)]),o("label",L,[c(o("input",{type:"checkbox","onUpdate:modelValue":t[2]||(t[2]=t=>e.analytics=t)},null,512),[[r,e.analytics]]),s(" "+l(e.browserlanguage.analytics),1)]),d(' <label class="checkbox">\n                <input type="checkbox" v-model="marketing" />\n                Marketing\n              </label> ')])]),o("footer",N,[o("button",{class:"button is-danger",onClick:t[3]||(t[3]=(...t)=>e.setSelection&&e.setSelection(...t))},l(e.browserlanguage.selection),1)])])],32)])):d("v-if",!0)])}g.render=S;export{g as default,S as render};
