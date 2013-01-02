/*
 * Copyright 2012 Max Schuster 
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function($) {
    var setter = {
        message: function(msg) {
            this.each(function() {
                var $this = $(this),
                    data = $this.data('loadingmask'),
                    sh = data.anchor.not(':visible'); // get the anchor if it is not visible
                    
                if (typeof msg === 'string') {
                    data.msg.text(msg);
                } else if (typeof msg === 'object') {
                    data.msg.html(msg);
                }
                sh.show(); // show the hidden anchor to have a size
                var msgHeight = data.msg.outerHeight(),
                    msgWidth = data.msg.outerWidth();
                sh.hide(); // and hide it if necessary
                data.msg.animate({
                    top: (msgHeight / 2 * -1 + -1) + 'px',
                    left: (msgWidth / 2 * -1 + -1) + 'px'
                }, 300, 'swing');
                data.settings.message = msg;
                $this.data('loadingmask', data);
            });
        }
    },
    methods = {
        init: function(options) {

            return this.each(function() {

                var $this = $(this),
                    data = $this.data('loadingmask');

                if (data) {
                    $this.loadingmask('destroy');
                }
                var overlay = $('<div/>', {
                    'class': 'loadingmask-mask'
                });
                var msg = $('<div/>', {
                    'class': 'loadingmask-msg'
                });
                var anchor = $('<div>', {
                    'class': 'loadingmask-anchor'
                });
                var settings = {
                    message: 'Waiting...',
                    easing: 'linear',
                    duration: 'fast'
                };

                $.extend(settings, options);

                anchor.append(msg);

                $this
                    .append(overlay, anchor)
                    .addClass('loadingmask')
                    .data('loadingmask', {
                        overlay: overlay,
                        anchor: anchor,
                        msg: msg,
                        settings: settings,
                        isVisible: false
                    }
                );

                $.each(settings, function(k, v) {
                    if (setter[k]) {
                        $this.loadingmask('option', k, v);
                    }
                });
            });
        },
        show: function() {
            return this.each(function() {
                var $this = $(this),
                        data = $this.data('loadingmask');
                if (data) {
                    if ($this.loadingmask('isVisible') === false) {
                        data.overlay.fadeIn(
                            data.settings.duration,
                            data.settings.easing,
                            function() {
                                $this.trigger('show.loadingmask');
                            }
                        );
                        data.anchor.fadeIn(
                            data.settings.duration,
                            data.settings.easing
                        );

                        data.isVisible = true;
                        $this.data('loadingmask', data);
                    }
                }
            });
        },
        hide: function() {
            return this.each(function() {
                var $this = $(this),
                        data = $this.data('loadingmask');
                if (data) {
                    if ($this.loadingmask('isVisible') === true) {
                        data.overlay.fadeOut(
                            data.settings.duration,
                            data.settings.easing,
                            function() {
                                $this.trigger('hide.loadingmask');
                            }
                        );
                        data.anchor.fadeOut(
                            data.settings.duration,
                            data.settings.easing
                        );
                        data.isVisible = false;
                        $this.data('loadingmask', data);
                    }
                }
            });
        },
        destroy: function( ) {
            return this.each(function() {
                var $this = $(this),
                        data = $this.data('loadingmask');
                if (data) {
                    $this.trigger('destroy.loadingmask');
                    $this.off('.loadingmask');
                    data.overlay.remove();
                    data.anchor.remove();
                    data.msg.remove();
                    $this.removeData('loadingmask').removeClass('loadingmask');
                }
            });
        },
        isVisible: function() {
            var result = false;
            this.each(function() {
                var $this = $(this),
                    data = $this.data('loadingmask');
                if (data.isVisible === true) {
                    result = true;
                    return false;
                }
            });
            return result;
        },
        option: function(name) {
            if (arguments.length === 1) {
                return $(this).data('loadingmask').settings[name];
            } else if (arguments.length === 2) {
                if (setter[name]) {
                    return setter[name].apply(this, Array.prototype.slice.call(arguments, 1));
                }
                this.each(function() {
                    var $this = $(this),
                        data = $this.data('loadingmask');
                    data.settings[name] = arguments[1];
                    $this.data('loadingmask', data);
                });
            }
        }
    };
    $.fn.loadingmask = function(method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.loadingmask');
        }

    };

})(jQuery);