angular
.module("mudyo.gumul", [])
.directive("gumul", function($compile, $http) {
    return {
        restrict: "C",
        scope: true,
        link: function($scope, $element) {
            var
                // mixes default settings and custom settings
                def = $.extend({
                    url: null,
                    jsonp: null,
                    vertical: 0,
                    height: "100%",
                    cellHeight: 30
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
                    }
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

                // angular data binding
                initNg = function () {
                    if (!def.jsonp && !def.url) return

                    $element.find("tbody").attr("ng-repeat", "_i in list")
                        .find("[data-bind]").each(function (i, p) {
                        p.setAttribute("ng-bind", "_i." + p.getAttribute("data-bind"))
                    })

                    if (def.vertical) {
                        elem.table.left.find("tbody").attr("ng-repeat", "_i in list")
                    }

                    var compile = $compile(html.find("tbody"));
                    compile($scope)
                },

                initPosition = function () {
                    elem.table.head.append(elem.table.main.find("thead"))

                    if (def.vertical) {
                        var $thead = elem.table.top.find(">thead"),
                            $tbody = elem.table.left.find(">tbody"),
                            $tr = $("<tr/>"),
                            $cells = null

                        elem.table.head.find("tr").each(function (i, tr) {
                            $cells = $("th,td", tr).slice(0, def.vertical)
                            $thead.append($tr.clone().append($cells))
                        })

                        elem.table.main.find("tr").each(function (i, tr) {
                            $cells = $("th,td", tr).slice(0, def.vertical)
                            $tbody.append($tr.clone().append($cells))
                        })

                        elem.pillar = $("<a class='mudyo-gumul-pillar'/>")
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

                    if (def.vertical) {
                        elem.table.top.find(">colgroup").append(elem.table.head.find("col").slice(0, def.vertical))
                        elem.table.left.find(">colgroup").append(col.slice(0, def.vertical))
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

                        if (i < def.vertical) {
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
                                aboveTable = index < def.vertical ? elem.table.top : elem.table.head,
                                belowTable = index < def.vertical ? elem.table.left : elem.table.main,
                                $col = $("col", aboveTable).eq(index - def.vertical),
                                calcWidth = parseInt($col.attr("width"))
                                    + (e.clientX - elem.resizeTarget.data("startX"))

                            if (calcWidth < 15) {
                                calcWidth = 15
                            }

                            $col.attr("width", calcWidth)
                            $("col", belowTable).eq(index - def.vertical).attr("width", calcWidth)

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

                    if (!def.vertical) {
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
                        ]

                        elem.table.top.width(width[0])
                        elem.table.left.width(width[0])
                        elem.table.head.width(width[1])
                        elem.table.main.width(width[1])

                        elem.top.width(width[0])
                        elem.left.width(width[0])
                        elem.head.width(html.width() - width[0])
                        elem.main.width(html.width() - width[0])

                        elem.left.height(html.height() - elem.head.height())
                        elem.main.height(elem.left.height())

                        elem.pillar.css("left", width[0])
                    }
                },
                initScrollEvent = function () {
                    if (!def.vertical) {
                        elem.main.on("scroll", function (e) {
                            elem.head.css("margin-left", this.scrollLeft * -1)
                            elem.sizeHandler.css("margin-left", this.scrollLeft * -1)
                        })

                        elem.head.on("wheel", function (e) {
                            elem.main.scrollTop(elem.main.scrollTop() + e.originalEvent.deltaY)
                            //e.preventDefault()
                        })
                    }
                    else {
                        elem.main.on("scroll", function (e) {
                            elem.shell.head.css("margin-left", this.scrollLeft * -1)
                            elem.shell.left.css("margin-top", this.scrollTop * -1)
                            elem.sizeHandler.slice(def.vertical).css("margin-left", this.scrollLeft * -1)
                        })

                        elem.head.add(elem.top).add(elem.left).on("wheel", function (e) {
                            elem.main.scrollTop(elem.main.scrollTop() + e.originalEvent.deltaY)
                            elem.main.scrollLeft(elem.main.scrollLeft() + e.originalEvent.deltaX)
                            //e.preventDefault()
                        })
                    }

                    elem.main.on("scroll", function (e) {
                        $scope.render();
                    })
                },
                initResizable = function () {
                    var left = 0
                    elem.sizeHandler.each(function (i, handler) {
                        var $handler = $(handler),
                            col = $handler.data("bind")
                        $handler.css("left", left += parseInt(col.attr("width")))
                    })
                };

            $scope.def = def;
            $scope.data = [];
            $scope.render = function() {
                var cst = elem.main.scrollTop(),
                    startIndex = parseInt(cst / def.cellHeight);

                if (!def.dataStartIndex || startIndex !== def.dataStartIndex) {
                    var mainHeight = elem.main.height(),
                        endIndex = startIndex + Math.ceil(mainHeight / 30);

                    def.dataStartIndex = startIndex;

                    $scope.list = $scope.data.slice(startIndex, endIndex);
                    $scope.$watch("list", function() {
                        $scope.$apply(function(){
                            elem.shell.main.css("margin-top", def.cellHeight * startIndex)

                            console.log(cst + mainHeight, $scope.data.length * def.cellHeight)
                            if (cst + mainHeight > $scope.data.length * def.cellHeight) {
                                $scope.load()
                            }
                        })
                    })
                }
            };
            $scope.load = function () {
                var fn = function (data) {
                    $scope.data = $scope.data.concat(data);
                    $scope.render();
                };

                if (def.jsonp) {
                    $http.jsonp(def.jsonp).success(fn)
                }
                else if (def.url) {
                    $http.post(def.url).success(fn)
                }
            };

            initPosition();
            initColgroup();
            initSize();
            initResizable();
            initScrollEvent();
            initNg();

            $scope.load()
        }

    }
});
