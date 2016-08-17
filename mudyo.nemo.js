var app = angular.module("app", [])
	.directive("mudyoGrid", function($compile) {
		return {
			restrict: "C",
			controller: function($scope) {
				$scope.list = [{"id":1,"email":"DReith@pharetra.io","username":"CRomo","password":"i1qt2","fname":"Noriess","lname":"Boomer","tel":"(479)923-4589","fund":808031283,"birthday":"2015-09-25T06:42:24.382Z","address":"7258 Morbi Dr","city":"Issaquah","state":"AZ","zip":39532,"age":17},{"id":2,"email":"GStoltenberg@turpis.ly","username":"BKvasnak","password":"sJQmh","fname":"Hanne","lname":"Lallemont","tel":"(868)816-7504","fund":952943040,"birthday":"1935-06-10T06:28:28.069Z","address":"4803 Amet Rd","city":"Fresno","state":"GA","zip":53064,"age":61},{"id":3,"email":"LCory@non.io","username":"GCoates","password":"88JAy","fname":"Dawn","lname":"Mathis","tel":"(427)840-2448","fund":507814189,"birthday":"2002-03-05T05:30:39.367Z","address":"1065 Libero Ave","city":"Arcadia","state":"RI","zip":59652,"age":31},{"id":4,"email":"KHumphrey@suspendisse.org","username":"HBarrick","password":"CUvUL","fname":"Nicolas","lname":"Hebert","tel":"(237)105-2504","fund":327584764,"birthday":"2063-03-30T01:03:45.375Z","address":"1412 Massa Rd","city":"Driggs","state":"NM","zip":19245,"age":66},{"id":5,"email":"JGover@augue.net","username":"CSturm","password":"DwVLo","fname":"Jayne","lname":"Kish","tel":"(744)254-3860","fund":402182207,"birthday":"1900-09-29T04:58:30.991Z","address":"3784 Sit Dr","city":"Snow Hill","state":"MT","zip":51058,"age":97},{"id":6,"email":"RThomad@vitae.org","username":"OPagnozzi","password":"gpHW0","fname":"Kantanzia","lname":"Nacita","tel":"(467)616-4609","fund":418550309,"birthday":"2091-04-29T13:38:00.060Z","address":"6945 Vel Ct","city":"Kingsland","state":"RI","zip":40371,"age":39},{"id":7,"email":"KFerreira@rutrum.net","username":"PGrund","password":"cYH2b","fname":"Carman","lname":"Krugel","tel":"(942)191-4324","fund":54824957,"birthday":"1901-01-26T17:24:58.798Z","address":"9066 Convallis St","city":"Boston","state":"NJ","zip":75762,"age":80},{"id":8,"email":"NLinville@porta.org","username":"MMendoza","password":"jlTv4","fname":"Diane","lname":"Wrather","tel":"(811)434-4003","fund":879076482,"birthday":"2077-01-15T01:22:11.521Z","address":"2062 Egestas Ave","city":"Bulverde","state":"CT","zip":65259,"age":99},{"id":9,"email":"APalmer@non.io","username":"VLenze","password":"CzVdI","fname":"Lyubov","lname":"Crumbliss","tel":"(952)275-0996","fund":487405630,"birthday":"2071-05-30T01:01:26.448Z","address":"1093 Odio Ln","city":"Albany","state":"KY","zip":45911,"age":88},{"id":10,"email":"LSaadeh@risus.io","username":"RRyan","password":"h1Zid","fname":"Esther","lname":"Beverage","tel":"(248)173-4647","fund":831810414,"birthday":"2036-03-29T08:40:11.336Z","address":"2892 Nec Dr","city":"Columbus","state":"VT","zip":91670,"age":88},{"id":11,"email":"GDominique@dolor.ly","username":"LMinihane","password":"oSiwf","fname":"Leslie","lname":"May","tel":"(759)517-5425","fund":343082981,"birthday":"2022-04-27T20:04:45.031Z","address":"8557 Lacus Ave","city":"New York","state":"CT","zip":66882,"age":49},{"id":12,"email":"JWilley@aenean.net","username":"ASalter","password":"dpCvD","fname":"Jill","lname":"Nguyen","tel":"(571)603-6601","fund":7174459,"birthday":"1957-06-09T21:33:46.141Z","address":"4501 Aenean Dr","city":"Onamia","state":"NJ","zip":29230,"age":77},{"id":13,"email":"CHarkey@placerat.ly","username":"LTruth","password":"YVsSU","fname":"Tara","lname":"Fraley","tel":"(743)645-7265","fund":872362952,"birthday":"1950-04-13T07:16:14.996Z","address":"4768 Ipsum St","city":"Rural","state":"MA","zip":82555,"age":12},{"id":14,"email":"TSzymanski@pulvinar.gov","username":"TLewis","password":"7OKM7","fname":"Song","lname":"Koprowski","tel":"(582)399-0506","fund":745063167,"birthday":"2042-05-27T02:36:17.038Z","address":"6984 Id Ave","city":"Killeen","state":"IA","zip":53967,"age":82},{"id":15,"email":"LFerguson@dolor.io","username":"CHopkins","password":"IGDD1","fname":"Xin","lname":"Pennell","tel":"(967)282-6223","fund":729477332,"birthday":"1949-03-08T06:01:09.281Z","address":"2406 Amet Ave","city":"Temecula","state":"NJ","zip":44560,"age":83},{"id":16,"email":"BBélanger@magna.org","username":"NDoerfler","password":"Pwa79","fname":"Terrance","lname":"Skiffington","tel":"(494)934-8119","fund":425744248,"birthday":"2069-10-01T17:37:15.995Z","address":"6907 Elementum Dr","city":"Decatur","state":"ND","zip":95647,"age":80},{"id":17,"email":"TOlsen@dolor.ly","username":"MWolz","password":"xHF6E","fname":"Mark","lname":"Eskin","tel":"(978)907-5049","fund":284909579,"birthday":"1949-01-29T23:38:22.549Z","address":"6367 Sed St","city":"Paxton","state":"IA","zip":38553,"age":0},{"id":18,"email":"EBogenschneider@ante.net","username":"FHolmes","password":"tgg5Q","fname":"Melina","lname":"Malstrom","tel":"(163)165-5508","fund":469902321,"birthday":"2046-05-17T15:49:46.027Z","address":"9988 Libero Rd","city":"Liberty","state":"OR","zip":70493,"age":85},{"id":19,"email":"GRock@lacus.ly","username":"NMoore","password":"DOGgn","fname":"Vanessa","lname":"Costa","tel":"(285)114-6938","fund":250346108,"birthday":"2068-08-04T18:23:14.674Z","address":"3162 Velit Ct","city":"Winona Lake","state":"WI","zip":82392,"age":33},{"id":20,"email":"RLoudin@mi.com","username":"LHaglund","password":"I1wkP","fname":"Romeo","lname":"Fouts","tel":"(622)303-0192","fund":950937932,"birthday":"2028-12-02T06:35:30.674Z","address":"1908 Malesuada Ave","city":"Washington","state":"IN","zip":69551,"age":1}]
			},
			link: function($scope, $element, $attrs) {
				var def = $.extend({
						vertical: 0,
						height: "100%"
					}, $element.data()),
					html = $("<div class='mudyo-grid'>"
						+ "<div class='mudyo-grid-t'><div><table><colgroup/><thead/></table></div></div>"
						+ "<div class='mudyo-grid-h'><div><table></table></div></div>"
						+ "<div class='mudyo-grid-l'><div><table><colgroup/><tbody/></table></div></div>"
						+ "<div class='mudyo-grid-m'><div/></div>"
						+ "</div>"),
					elem = {
						nest:	$element.parent(),
						top:	$(">.mudyo-grid-t", html),
						left:	$(">.mudyo-grid-l", html),
						head:	$(">.mudyo-grid-h", html),
						main:	$(">.mudyo-grid-m", html),
						table:	{
							top:	$(">.mudyo-grid-t table", html),
							left:	$(">.mudyo-grid-l table", html),
							head:	$(">.mudyo-grid-h table", html),
							main:	$element.after(html)
						},
						shell:	{
							top:	$(">.mudyo-grid-t>div", html),
							left:	$(">.mudyo-grid-l>div", html),
							head:	$(">.mudyo-grid-h>div", html),
							main:	$(">.mudyo-grid-m>div", html).append($element.removeClass("mudyo-grid"))
						}
					},
					colsize = function(){
						var size = 0
						$(">th,>td", elem.table.main.find("tr").eq(0)).each(function(i,c){
							size += c.getAttribute("colSpan")||1
						})
						return size
					}(),
					getWidth = function($table) {
						var width = 0
						$table.find("col").each(function(i, col){
							width += parseInt(col.getAttribute("width"))
						})
						return width
					},
					initNg = function() {
						$element.find("tbody").attr("ng-repeat", "_i in list")
							.find("[data-bind]").each(function(i,p){
							p.setAttribute("ng-bind", "_i." + p.getAttribute("data-bind"))
						})

						if (def.vertical) {
							elem.table.left.find("tbody").attr("ng-repeat", "_i in list")
						}
					},
					initPosition = function() {
						elem.table.head.append(elem.table.main.find("thead"))

						if (def.vertical) {
							var $thead = elem.table.top.find(">thead"),
								$tbody = elem.table.left.find(">tbody"),
								$tr = $("<tr/>"),
								$cells = null

							elem.table.head.find("tr").each(function(i,tr){
								$cells = $("th,td", tr).slice(0, def.vertical)
								$thead.append($tr.clone().append($cells))
							})

							elem.table.main.find("tr").each(function(i,tr){
								$cells = $("th,td", tr).slice(0, def.vertical)
								$tbody.append($tr.clone().append($cells))
							})

							elem.pillar = $("<a class='mudyo-grid-pillar'/>")
							html.append(elem.pillar)
						}
					},
					initColgroup = function() {
						var i,
						colgroup = $(">colgroup", elem.table.main),
						col = colgroup.find(">col")

						if (!colgroup.length) {
							colgroup = $("<colgroup/>")
							elem.table.main.append(colgroup)
						}

						if (colsize !== col.length) {
							for (i = col.length; i < colsize; i++) {
								colgroup.append("<col width=100/>")
							}

							col = $(">col", colgroup)
						}

						elem.table.head.append(colgroup.clone(true))

						if (def.vertical) {
							elem.table.top .find(">colgroup").append(elem.table.head.find("col").slice(0, def.vertical))
							elem.table.left.find(">colgroup").append(col.slice(0, def.vertical))
						}

						for(i = 0; i < colsize; i++) {
							var handler = $("<a class='mudyo-grid-resize-handler'/>")
								.data({
									bind: col.eq(i),
									index: i
								})
								.on("mousedown", function(e){
									var $this = $(this).addClass("handling")
									$this.data({
										handling: true,
										startX: e.clientX,
										offsetLeft: parseInt($this.css("left"))
									})

									def.resize = $this
								})

							if(i < def.vertical) {
								handler.css("z-index", 3)
							}

							html.append(handler)
						}

						html.on("mousemove", function(e){
							if(def.resize) {
								def.resize.css({
									left: def.resize.data("offsetLeft")
											+ e.clientX
											- def.resize.data("startX")
								})
							}

							e.preventDefault()
						})
						.on("mouseup", function(e){
							if(!def.resize) return

							var index = def.resize.data("index"),
								aboveTable = index < def.vertical ? elem.table.top  : elem.table.head,
								belowTable = index < def.vertical ? elem.table.left : elem.table.main,
								$col = $("col", aboveTable).eq(index - def.vertical),
								calcWidth = parseInt($col.attr("width"))
											+ (e.clientX - def.resize.data("startX"))

							console.log($col)
							console.log(parseInt($col.attr("width")) + " + " + e.clientX + " - " + def.resize.data("startX") + " = " + (e.clientX - def.resize.data("startX")))

							if(calcWidth < 15) {
								calcWidth = 15
							}

							$col.attr("width", calcWidth)
							$("col", belowTable).eq(index - def.vertical).attr("width", calcWidth)

							def.resize.removeClass("handling")
							def.resize = null

							initSize()
							initResizable()
						})

						elem.sizeHandler = html.find(".mudyo-grid-resize-handler")
					},
					initSize = function() {
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

							elem.table.top .width(width[0])
							elem.table.left.width(width[0])
							elem.table.head.width(width[1])
							elem.table.main.width(width[1])

							elem.top .width(width[0])
							elem.left.width(width[0])
							elem.head.width(html.width() - width[0])
							elem.main.width(html.width() - width[0])

							elem.left.height(html.height() - elem.head.height())
							elem.main.height(elem.left.height()).css("float", "right")

							elem.pillar.css("left", width[0])
						}
					},
					initScrollEvent = function() {
						if (!def.vertical) {
							elem.main.on("scroll", function(e){
								elem.head.css("margin-left", this.scrollLeft * -1)
								elem.sizeHandler.css("margin-left", this.scrollLeft * -1)
							})

							elem.head.on("wheel", function(e) {
								elem.main.scrollTop(elem.main.scrollTop() + e.originalEvent.deltaY)
								e.preventDefault()
							})
						}
						else {
							elem.main.on("scroll", function(e){
								elem.shell.head.css("margin-left", this.scrollLeft * -1)
								elem.shell.left.css("margin-top", this.scrollTop * -1)
								elem.sizeHandler.slice(def.vertical).css("margin-left", this.scrollLeft * -1)
							})

							elem.head.add(elem.top).add(elem.left).on("wheel", function(e) {
								elem.main.scrollTop (elem.main.scrollTop () + e.originalEvent.deltaY)
								elem.main.scrollLeft(elem.main.scrollLeft() + e.originalEvent.deltaX)
								e.preventDefault()
							})
						}

						elem.sizeHandler
					},
					initResizable = function() {
						var left = 0
						elem.sizeHandler.each(function(i, handler){
							var $handler= $(handler),
							col = $handler.data("bind")
							$handler.css("left", left += parseInt(col.attr("width")))
						})
					}

				$scope.$watch("list", function(){
					if (!$element.data("iamready")) {
						$element.data("iamready", true)

						initNg()
						initPosition()
						initColgroup()
						initSize()
						initResizable()
						initScrollEvent()

						$compile(html.find("tbody"))($scope)
					}
				})
			}
		}
	})

