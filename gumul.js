angular
.module("mudyo.gumul", [])
.directive("gumul", function($filter, $http) {
    return {
        restrict: "C",
        scope: true,
        link: function($scope, $element) {
            var
                // mixes default settings and custom settings
                def = $.extend({
                    url: null,
                    http: "post",
                    fix: 0,
                    height: "100%",
                    cellHeight: 30,
                    startedIndex: 0,
                    endedIndex: 0
                }, $element.data()),

                // create HTML structure
                html = $("<div class='mudyo-gumul'>"
                    + "<div class='mudyo-gumul-t'><div><table><colgroup/><thead/></table></div></div>"
                    + "<div class='mudyo-gumul-h'><div><table></table></div></div>"
                    + "<div class='mudyo-gumul-l'><div><table><colgroup/></table></div></div>"
                    + "<div class='mudyo-gumul-m'><div/></div>"
                    + "</div>"),

                // generate selector in HTML structure
                elem = {
                    nest: $element.parent(),
                    top: $(">.mudyo-gumul-t", html),
                    left: $(">.mudyo-gumul-l", html),
                    head: $(">.mudyo-gumul-h", html),
                    main: $(">.mudyo-gumul-m", html),
                    table: {
                        top: $(">.mudyo-gumul-t table", html),
                        left: $(">.mudyo-gumul-l table", html),
                        head: $(">.mudyo-gumul-h table", html),
                        main: $element.after(html)
                    },
                    shell: {
                        top: $(">.mudyo-gumul-t>div", html),
                        left: $(">.mudyo-gumul-l>div", html),
                        head: $(">.mudyo-gumul-h>div", html),
                        main: $(">.mudyo-gumul-m>div", html).append($element)
                    },
                    shape: {}
                },

                // calculate column size
                getColumnSize = function () {
                    var size = 0
                    $(">th,>td", elem.table.main.find("tr").eq(0)).each(function (i, c) {
                        size += c.getAttribute("colSpan") || 1
                    })
                    return size
                }(),

                // calculate setting witch is table width
                getWidth = function ($table) {
                    var width = 0
                    $table.find("col").each(function (i, col) {
                        width += parseInt(col.getAttribute("width"))
                    })
                    return width
                },

                initPosition = function () {
                    elem.table.head.append($element.find("thead"));
                    elem.shape.main = $element.find("tbody").clone(true);

                    if (def.url) {
                        $element.find("tbody").remove();
                    }

                    if (def.fix) {
                        var length,
                            $tbody,
                            $tr = $("<tr/>");

                        elem.shape.left = elem.shape.main.clone(true);
                        elem.shape.left.find("tr").each(function (i, tr) {
                            length = 0;
                            $("th,td", tr).each(function (j, thd) {
                                length += parseInt(thd.getAttribute("colSpan") || 1);

                                if (length > def.fix) {
                                    $(thd).remove()
                                }
                            })
                        });

                        elem.shape.main.find("tr").each(function (i, tr) {
                            length = 0;
                            $("th,td", tr).each(function (j, thd) {
                                length += parseInt(thd.getAttribute("colSpan") || 1);

                                if (length <= def.fix) {
                                    $(thd).remove()
                                }
                                else {
                                    return false
                                }
                            })
                        });

                        elem.table.head.find("tr").each(function (i, tr) {
                            elem.table.top.find("thead").append(
                                $tr.clone().append(
                                    $("th,td", tr).slice(0, def.fix)
                                )
                            )
                        });

                        elem.table.main.find("tbody").each(function (i, tbody) {
                            $tbody = $("<tbody/>");

                            $("tr", tbody).each(function (j, tr) {
                                $tbody.append(
                                    $tr.clone().append(
                                        $("th,td", tr).slice(0, def.fix)
                                    )
                                )
                            });

                            elem.table.left.append($tbody)
                        });

                        elem.pillar = $("<a class='mudyo-gumul-pillar'/>");
                        html.append(elem.pillar)
                    }
                },

                initColgroup = function () {
                    var i,
                        colgroup = $(">colgroup", elem.table.main),
                        col = colgroup.find(">col")

                    if (!colgroup.length) {
                        colgroup = $("<colgroup/>")
                        elem.table.main.append(colgroup)
                    }

                    if (getColumnSize !== col.length) {
                        for (i = col.length; i < getColumnSize; i++) {
                            colgroup.append("<col width=100/>")
                        }

                        col = $(">col", colgroup)
                    }

                    elem.table.head.append(colgroup.clone(true))

                    if (def.fix) {
                        elem.table.top.find(">colgroup").append(elem.table.head.find("col").slice(0, def.fix))
                        elem.table.left.find(">colgroup").append(col.slice(0, def.fix))
                    }

                    for (i = 0; i < getColumnSize; i++) {
                        var handler = $("<a class='mudyo-gumul-resize-handler'/>")
                            .data({
                                bind: col.eq(i),
                                index: i
                            })
                            .on("mousedown", function (e) {
                                var $this = $(this).addClass("handling")
                                $this.data({
                                    handling: true,
                                    startX: e.clientX,
                                    offsetLeft: parseInt($this.css("left"))
                                })

                                elem.resizeTarget = $this
                            })

                        if (i < def.fix) {
                            handler.css("z-index", 3)
                        }

                        html.append(handler)
                    }

                    html.on("mousemove", function (e) {
                            if (elem.resizeTarget) {
                                elem.resizeTarget.css({
                                    left: elem.resizeTarget.data("offsetLeft")
                                    + e.clientX
                                    - elem.resizeTarget.data("startX")
                                })

                                e.preventDefault()
                            }
                        })
                        .on("mouseup", function (e) {
                            if (!elem.resizeTarget) return

                            var index = elem.resizeTarget.data("index"),
                                aboveTable = index < def.fix ? elem.table.top : elem.table.head,
                                belowTable = index < def.fix ? elem.table.left : elem.table.main,
                                $col = $("col", aboveTable).eq(index - def.fix),
                                calcWidth = parseInt($col.attr("width"))
                                    + (e.clientX - elem.resizeTarget.data("startX"))

                            if (calcWidth < 15) {
                                calcWidth = 15
                            }

                            $col.attr("width", calcWidth)
                            $("col", belowTable).eq(index - def.fix).attr("width", calcWidth)

                            elem.resizeTarget.removeClass("handling")
                            elem.resizeTarget = null

                            initSize()
                            initResizable()
                        })

                    elem.sizeHandler = html.find(".mudyo-gumul-resize-handler")
                },
                initSize = function () {
                    /*if(def.height === "100%") {
                        elem.shell.main.css("padding-bottom", 5)
                    }*/

                    html.height(def.height)

                    if (!def.fix) {
                        elem.table.head.width(getWidth(elem.table.top))
                        elem.table.main.width(elem.table.head.width())
                        elem.head.width(html.width())
                        elem.main.width(html.width())
                            .height(html.height() - elem.head.height())
                    }
                    else {
                        var width = [
                                getWidth(elem.table.top),
                                getWidth(elem.table.head)
                            ];

                        def.mainHeight = html.height() - elem.head.height();

                        elem.table.top.width(width[0])
                        elem.table.left.width(width[0])
                        elem.table.head.width(width[1])
                        elem.table.main.width(width[1])

                        elem.top.width(width[0])
                        elem.left.width(width[0])
                        elem.head.width(html.width() - width[0])
                        elem.main.width(html.width() - width[0])

                        elem.left.height(def.mainHeight)
                        elem.main.height(def.mainHeight)

                        elem.pillar.css("left", width[0])
                    }
                },
                initScrollEvent = function () {
                    if (!def.fix) {
                        elem.main.on("scroll", function (e) {
                            elem.head.css("margin-left", this.scrollLeft * -1);
                            elem.sizeHandler.css("margin-left", this.scrollLeft * -1);
                        });

                        elem.head.on("wheel", function (e) {
                            elem.main.scrollTop(elem.main.scrollTop() + e.originalEvent.deltaY);
                            //e.preventDefault()
                        });
                    }
                    else {
                        elem.main.on("scroll", function (e) {
                            elem.shell.head.css("left", this.scrollLeft * -1);
                            elem.shell.left.css("top" , this.scrollTop * -1);
                            elem.sizeHandler.slice(def.fix).css("margin-left", this.scrollLeft * -1);
                        });

                        elem.head.add(elem.top).add(elem.left).on("wheel", function (e) {
                            elem.main.scrollTop(elem.main.scrollTop() + e.originalEvent.deltaY);
                            elem.main.scrollLeft(elem.main.scrollLeft() + e.originalEvent.deltaX);
                            //e.preventDefault()
                        });
                    }

                    if (def.url) {
                        elem.main.on("scroll", function (e) {
                            render(this.scrollTop);
                        });
                    }
                },
                initResizable = function () {
                    var left = 0
                    elem.sizeHandler.each(function (i, handler) {
                        var $handler = $(handler),
                            col = $handler.data("bind")
                        $handler.css("left", left += parseInt(col.attr("width")))
                    })
                },
                render = function(scrollTop, force) {
                    var startIndex = parseInt(scrollTop / def.cellHeight),
                        endIndex = startIndex + Math.ceil((def.mainHeight + def.cellHeight) / def.cellHeight),
                        i;

                    if (endIndex > $scope.data.length) {
                        endIndex = $scope.data.length
                    }

                    if(force || startIndex !== def.startedIndex) {
                        console.log(startIndex + "(" + def.startedIndex +") / " + endIndex + "(" + def.endedIndex + ")");

                        if (startIndex < def.startedIndex) {
                            removeRow(def.startedIndex - (endIndex - def.endedIndex), def.endedIndex);

                            for (i = def.startedIndex - 1; i >= startIndex; i--) {
                                createRow($scope.data[i], true)
                            }
                        }
                        else {
                            removeRow(0, startIndex - def.startedIndex);

                            for (i = def.endedIndex; i < endIndex; i++) {
                                createRow($scope.data[i])
                            }
                        }

                        elem.shell.main.css("margin-top", def.cellHeight * startIndex);

                        if (def.fix) {
                            elem.shell.left.css("margin-top", def.cellHeight * startIndex);
                        }
                    }

                    def.startedIndex = startIndex;
                    def.endedIndex = endIndex;
                },
                createRow = function(data, insertBefore) {
                    var shape = [
                            elem.shape.main.clone(true)
                        ],
                        getValue = function(data, name, type, format) {
                            if(!data || !name) {
                                return ""
                            }

                            if (type) {
                                if (format) {
                                    return $filter(type)(data[name], format)
                                }

                                return $filter(type)(data[name])
                            }

                            return data[name]
                        };

                    shape[0].find("[data-bind]").each(function(i, td) {
                        td.innerHTML = getValue(data, td.getAttribute("data-bind"), td.getAttribute("data-type"), td.getAttribute("data-format"))
                    });

                    if (insertBefore) {
                        elem.table.main.find("tbody:eq(0)").before(shape[0]);
                    }
                    else {
                        elem.table.main.append(shape[0]);
                    }

                    if (def.fix) {
                        shape[1] = elem.shape.left.clone(true);
                        shape[1].find("[data-bind]").each(function(i, td) {
                            td.innerHTML = getValue(data, td.getAttribute("data-bind"), td.getAttribute("data-type"), td.getAttribute("data-format"))
                        });

                        if (insertBefore) {
                            elem.table.left.find("tbody:eq(0)").before(shape[1]);
                        }
                        else {
                            elem.table.left.append(shape[1]);
                        }
                    }
                },
                removeRow = function(start, end) {
                    console.log("remove " + start + ", " + end);

                    elem.table.main.find("tbody").slice(start, end).remove();

                    if (def.fix) {
                        elem.table.left.find("tbody").slice(start, end).remove();
                    }
                }
                ;

            $scope.def = def;
            $scope.elem = elem;
            $scope.data = [];
            $scope.load = function () {
                var fn = function (data) {
                    if ($scope.data.length === 0) {
                        $scope.data = $scope.data.concat(data);
                        render(0, true);
                        return
                    }

                    $scope.data = $scope.data.concat(data);
                };

                if (def.url) {
                    $http[def.http](def.url).success(fn)
                }
            };

            initPosition();
            initColgroup();
            initSize();
            initResizable();
            initScrollEvent();

            $scope.load();
            $scope.$watch("data", function(){

            })
        }

    }
});
