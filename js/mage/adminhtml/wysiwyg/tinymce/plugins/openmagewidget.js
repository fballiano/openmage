/**
 * OpenMage
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE_AFL.txt.
 * It is also available at https://opensource.org/license/afl-3-0-php
 *
 * @category    Mage
 * @package     Mage_Adminhtml
 * @copyright   Copyright (c) 2006-2020 Magento, Inc. (https://www.magento.com)
 * @copyright   Copyright (c) 2022 The OpenMage Contributors (https://www.openmage.org)
 * @license     https://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

tinymce.PluginManager.add('openmagewidget', (ed, url) => {

    return {
        init: function (editor) {
            var self = this;

            this.activePlaceholder = null;
            editor.addCommand('mceOpenmagewidget', function (img) {
                if (self.activePlaceholder) {
                    img = self.activePlaceholder;
                }
                var config = tinyMceEditors.get(tinymce.activeEditor.id).magentoPluginsOptions.get('openmagewidget');
                widgetTools.openDialog(
                    config.widget_window_url + 'widget_target_id/' + editor.getElement().id + '/'
                );
            });

            // Register Widget plugin button
            editor.ui.registry.addIcon(
                'openmagewidget',
                '<svg version="1.1" id="magentologo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="40px" viewBox="0 0 20 40" enable-background="new 0 0 20 40" xml:space="preserve">' +
                '<path fill="#FB0E70" d="M12.9,23.4V30H7.5v-6.3c0-1,0.3-1.8,0.8-2.3c0.5-0.5,1.2-0.8,2-0.8c0.8,0,1.5,0.2,1.9,0.7 C12.7,21.8,12.9,22.5,12.9,23.4z M3.8,21.3c-0.5-0.5-1.1-0.7-1.9-0.7c-0.8,0-1.4,0.2-1.9,0.7V30h4.5v-6.6 C4.5,22.5,4.3,21.8,3.8,21.3z M16.2,10H0v9.1c0.2-0.2,0.4-0.4,0.6-0.5C1.3,18.2,2.1,18,3,18c1,0,1.8,0.2,2.5,0.7 c0.7,0.5,1.2,1.1,1.6,2c0.4-0.8,0.9-1.5,1.7-1.9c0.7-0.5,1.6-0.7,2.5-0.7c1.4,0,2.6,0.4,3.4,1.3c0.8,0.9,1.3,2.2,1.3,3.8V30H20V13.8 C20,11.7,18.3,10,16.2,10z"></path>' +
                '</svg>'
            );
            editor.ui.registry.addToggleButton('openmagewidget', {
                icon: 'openmagewidget',
                tooltip: 'Insert Widget',

                /**
                 * execute openVariablesSlideout for onAction callback
                 */
                onAction: function () {
                    editor.execCommand('mceOpenmagewidget');
                },
                onSetup: function (api) {
                    // Add a node change handler, selects the button in the UI when a image is selected
                    editor.on('NodeChange', function (e) {
                        api.setActive(false);
                        var n = e.target;
                        if (n.id && n.nodeName == 'IMG') {
                            var widgetCode = Base64.idDecode(n.id);
                            if (widgetCode.indexOf('{{widget') != -1) {
                                api.setActive(true);
                            }
                        }
                    });
                }
            });

            // Add a widget placeholder image double click callback
            editor.on('dblClick', function (e) {
                var n = e.target;
                if (n.id && n.nodeName == 'IMG') {
                    var widgetCode = Base64.idDecode(n.id);
                    if (widgetCode.indexOf('{{widget') != -1) {
                        this.execCommand('mceOpenmagewidget', null);
                    }
                }
            });
        },

        /**
         * @return {Object}
         */
        getMetadata: function () {
            return {
                longname: 'OpenMage Widget Manager Plugin',
                author: 'OpenMage Core Team',
                authorurl: 'https://www.openmage.org',
                infourl: 'https://www.openmage.org',
                version: '1.0'
            };
        }
    }
    
});