
import Tab from '../../node_modules/bootstrap5/js/src/tab.js';
import Dropdown from '../../node_modules/bootstrap5/js/src/dropdown.js';



document.addEventListener('DOMContentLoaded', function() {

	// load syntax highlighting css async
	// https://stackoverflow.com/questions/32759272/how-to-load-css-asynchronously
	document.getElementById('prism-css').media='all';


	/**
	 * show/hide offcanvas navigation
	 *
	 */
	document.getElementById('toggle-offcanvas').addEventListener('click',function(){
		document.body.classList.toggle('offcanvas-open');
	});


	// don't show theme optinos unless we're displaying a demo
	var demo_divs = document.querySelectorAll('.demo');
	if( demo_divs.length == 0 ){
		return;
	}


	// theme switcher
	var themes			= ['bootstrap5','bootstrap4','bootstrap3','default'];
	var theme			= localStorage.getItem('theme') || 'bootstrap4';
	var themes_div	= document.createElement('div');
	themes_div.classList.add('theme-selector')
	var container	= document.getElementById('main-container')

	if( !document.querySelectorAll('.demo-mini').length ){
		container.insertBefore(themes_div, container.firstChild);
	}

	SetTheme(theme);

	// add info about script and current value below each demo
	for(let i = 0; i < demo_divs.length; i++){
		let demo	= demo_divs[i];
	}



	/**
	 * Set the	current theme
	 *
	 */
	function SetTheme(theme){

		localStorage.setItem('theme',theme);

		themes_div.innerHTML = '';
		for( let i = 0; i < themes.length; i++) {

			let a = document.createElement('a');
			a.textContent = themes[i];
			a.className = 'btn btn-link btn-sm'
			if( themes[i] === theme ){
				a.classList.add('active');
			}
			themes_div.appendChild(a);

			a.addEventListener('click',function(evt){
				evt.preventDefault();
				SetTheme(themes[i]);
			});
		}


		var link			= document.getElementById('select-theme');
		if( link ) link.parentNode.removeChild(link);

		link				= document.createElement('link');
		link.id				= 'select-theme';

		link.setAttribute('rel','stylesheet');
		link.setAttribute('href','/css/tom-select.' + theme + '.css');
		document.getElementsByTagName('head')[0].appendChild(link);

	}


	/**
	 * CodePen
	 *		https://blog.codepen.io/documentation/prefill/
	 *
	 * CodeSandbox
	 *		https://codesandbox.io/docs/api
	 *		... submitting requires other js packages: https://github.com/codesandbox/codesandbox-client/issues/4948
	 *
	 * JSFiddle
	 *		https://docs.jsfiddle.net/api/display-a-fiddle-from-post
	 *
	 */
	document.addEventListener('click',(evt)=>{

		var open_sandbox_link = evt.target.closest('.opensandbox');

		if( open_sandbox_link ){
			var demo 	= open_sandbox_link.closest('.demo');
			var codepen, codesandbox;

			function getTextContent(tag){
				var el = demo.querySelector(tag);
				if( el ){
					return el.textContent || '';
				}
				return '';
			}


			var html			= `<div class="p-4">${demo.querySelector('textarea').value || ''}</div>`;
			var css				= getTextContent('style');
			var js				= getTextContent('script');
			var theme			= localStorage.getItem('theme') || 'bootstrap4';
			var css_urls		= [
										`https://cdn.jsdelivr.net/gh/orchidjs/tom-select@1.6.1/dist/css/tom-select.${theme}.min.css`,
										'https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/css/bootstrap.min.css',
										'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css',
									];

			var js_urls			= ['https://cdn.jsdelivr.net/gh/orchidjs/tom-select@1.6.1/dist/js/tom-select.complete.min.js'];


			// add jquery when needed
			if( demo.classList.contains('demo-jquery') ){
				js_urls.push('https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js');
				js_urls.push('https://cdn.jsdelivr.net/npm/jquery-ui-dist@1.12.1/jquery-ui.js');
			}

			// codesandbox
			codesandbox = {
				files: {
					"package.json": {
						content: {
							dependencies:{},
						}
					},
					"index.html": {
						content: html
					},
					"index.js": {
						content: js
					},
					"index.css":{
						content: css,
					}
				}
			};
			//demo.querySelector('.codesandbox').value = JSON.stringify(codesandbox);


			// codepen
			codepen = {
				html: html,
				js:	js,
				css: css,
				js_external: js_urls.join(';'),
				css_external: css_urls.join(';'),
			};
			demo.querySelector('.codepen').value = JSON.stringify(codepen);


			// JSFiddle
			demo.querySelector('.jsfiddle-html').value = html;
			demo.querySelector('.jsfiddle-js').value = js;
			demo.querySelector('.jsfiddle-css').value = css;
			demo.querySelector('.jsfiddle-resources').value = js_urls.join(',') + ','+css_urls.join(',');

			setTimeout(()=>{
				open_sandbox_link.nextElementSibling.submit();
			},50);
		}

	});


});