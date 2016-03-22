/* eslint-disable no-undef */

CKEDITOR.plugins.add('mediaboxconvert', {
	requires: 'mediabox',
	icons: 'mediabox',
	init: function (editor) {
		editor.allowedContent = 'div{*}(*);' +
		'a{*}(*); i{*}[*]' +
		'a[!fullIcon,!shareIcon]{*}' +
		'div(!media_widget);' +
		'h4(!widget_h4_header);' +
		'div(!media_embed);' +
		'div(!widgeticon);' +
		'div(!caption_credit);' +
		'div(!socialbtns);' +
		'span[*]{*}; iframe[!src,frameborder,allowfullscreen];' +
		'img[*]{*}';

		editor.disallowedContent = 'iframe[width,height];';

		editor.addCommand('mediaboxconvert', {
			exec: function (editor) {
				var selection = editor.getSelection();
				var element = selection.getStartElement();

				var img = element.getAscendant('img', true);
				var insulator = element.getAscendant('div', true);
				var markup;

				if (img) {
					markup = img.getOuterHtml();
				} else if (insulator && insulator.hasClass('iframe-insulator')) {
					// remove the iframe-insulator div before inserting the new template
					element.remove();

					// extract only the iframe markup
					markup = insulator.$.innerHTML;
					console.log('using markup:', markup);
				}

				// this will be upscaled to a mediabox widget by using the
				// template from github.com/radiovisual/ckeditor-mediabox
				var template = '<div class="media_widget">' +
				'  <h4 class="widget_h4_header">Media Header Goes Here</h4>' +
				'  <div class="media_embed">    ' + markup +
				'  </div>' +
				'	<div class="widgeticon">' +
				'		<a href="#" class="fullIcon fancyboxlaunch fancybox.iframe"><i class="fa fa-arrows-alt"></i><span class="hidden"><!--ckeditor needs this span to make the widget work. facepalm.-->&nbsp;</span></a>' +
				'		<a href="#" class="shareIcon social-btn sb-closed"><i class="fa fa-external-link-square"></i><span class="hidden"><!--ckeditor needs this span to make the widget work. facepalm.-->&nbsp;</span></a>' +
				'	</div>' +
				'	<div class="caption_credit"><p><span class="caption">Caption here.</span><span class="credit">@2016 Credit here.</span></p></div>' +
				'	<div class="socialbtns">' +
				'		<span class="socialbtnsIcon"><i class="fa fa-facebook"></i><span class="facebook-text">facebook text here</span></span>' +
				'		<span class="socialbtnsIcon"><i class="fa fa-twitter"></i><span class="tweet-text">tweet text here</span></span>' +
				'	</div>' +
				'</div>';

				// replace the selection with the new template
				var newElement = CKEDITOR.dom.element.createFromHtml(template);
				editor.insertElement(newElement);

				// now activate the widget so it can inherit the widget behaviors
				editor.widgets.initOn(newElement, 'mediabox');
			}
		});

		// load the context menu
		if (editor.contextMenu) {
			editor.addMenuGroup('mediaboxconvertGroup');
			editor.addMenuItem('mediaboxconvertItem', {
				label: 'Convert to Mediabox',
				icon: this.path + 'icons/mediabox.png',
				command: 'mediaboxconvert',
				group: 'mediaboxconvertGroup'
			});

			// add an event listener function that will be called whenever the context menu is fired.
			editor.contextMenu.addListener(function (element) {
				var img = element.getAscendant('img', true);
				var div = element.getAscendant('div', true);

				// ignore media already wrapped in a mediabox widget
				if (div && div.hasClass('media_embed')) {
					return false;
				}

				if (img || (div && div.hasClass('iframe-insulator'))) {
					return {mediaboxconvertItem: CKEDITOR.TRISTATE_OFF};
				}
				return false;
			});
		}
	}
});
