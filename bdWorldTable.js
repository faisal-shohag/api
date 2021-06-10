
    function showArea(){
      $("#showarea").toggle();
      $("#showDist").hide();
    }

    function makeTable(t) {
      let e = totalCount(t),
        n =
          "<ul style='margin-top:0; padding-top:0;' class='list-group'><li><table><thead><tr><th></th></tr></thead><tbody id='locationTotal'>";
      $("#affectedPeopleNumber").text(e);
      for (let o = 1; o < t.length; o++) {
        let a = t[o][1].country;
        let cases = t[o][1].cases;
        let todayCases = t[o][1].todayCases;
        let active = t[o][1].active;
        let deaths = t[o][1].deaths;
        let todayDeaths = t[o][1].todayDeaths;
        let recovered = t[o][1].recovered;
        let critical = t[o][1].critical;
        let totalTests = t[o][1].totalTests;
        n +=
          "<tr><td style='background: #111; padding:5px; border-bottom: 1px solid #000;'>" +
          t[o][0] + "#" + " <span style='font-size: 26px; font-weight: bold;'>" + a + "</span>" + "<br><span style='font-size:14px'>Total Cases: " + cases +" </span> | " + "<span style='font-size:14px'>New: " + todayCases +" </span> | "  + "<span style='font-size:14px'>Active: " + active +" </span> <br>" + "<span style='font-size:14px'>Total Deaths: " + deaths +" </span> | " + "<span style='font-size:14px'>New: " + todayDeaths +" </span> | " + "<span style='font-size:14px'>Critical: " + critical +" </span> <br> " + "<span style='font-size:14px'>Total Tests: " + totalTests +" </span>"
          "</td><td>";
      }
      (n += "</tbody></table></li></ul>"), $("#countriesInfo").html(n);
    }
    function totalCount(t) {
      let e = 0;
      for (let n = 1; n < t.length; n++) e += parseInt(t[n][1]);
      return e;
    }
    $(function () {
      $.get(
        "https://coronavirus-19-api.herokuapp.com/countries",
        function () { }
      )
        .done(function (t) {
          let e = Object.entries(t);
          //console.log(t)
          //$("")
          $("#affectedAreaNumber").html(e.length-1),
            makeTable(e),
            $("#accending").click(function () {
              e.sort(function (t, e) {
                return t[1].cases - e[1].cases;
              }),
                $("#countriesInfo").html(makeTable(e));
            }),
            $("#decending").click(function () {
              e.sort(function (t, e) {
                return e[1].cases - t[1].cases;
              }),
                $("#countriesInfo").html(makeTable(e));
            });
        })
        .fail(function () {
          showToast("Something went wrong!");
        });
    });


    function makeul(t) {
      let e = total(t),
        n =
          "<ul style='margin-top:0; padding-top:0;' class='list-group'><li><table><thead><tr><th></th></tr></thead><tbody id='locationTotal'>";
      $("#list").text(e);
      //console.log(t.length)
        var i=0;
      for (let o = 0; o < t.length; o++) {
        let a = t[o][1].name;
        let count = t[o][1].count;
        let prev_count = t[o][1].prev_count;
        let inc = count - prev_count;
          i++;
        //console.log(a);
        n +=
          "<tr><td style='background: #111; padding:5px; border-bottom: 1px solid #000;'>" +
          i + "#" + " <span style='font-size: 20px; font-weight: bold;'>" + a + "</span></td>" +  "<td><span style='font-size: 25px; font-weight: bold;' class='text-info'>" + count + "</span>" + "<span style='font-size: 15px; vartical-align:bottom; font-weight: bold; font-family: Google Sans'> <i class='text-warning fa fa-angle-double-up' aria-hidden='true'><span>" + inc + "</span></i></span>" +"</td></tr>";
      }
      (n += "</tbody></table></li></ul>"), $("#districtsInfo").html(n);
    }
    function total(t) {
      let e = 0;
      for (let n = 0; n < t.length; n++) e += parseInt(t[n][1]);
      return e;
    }
    $(function () {
      $.get(
        "https://corona-bd.herokuapp.com/district",
        function () { }
      )
        .done(function (t) {
          let e = Object.entries(t.data);
          $("#updated_on").html("Last Update: " + t.updated_on);
          //console.log(e)
          //console.log(t.data);
          $("#affectedNumber").html(e.length),
            makeul(e),
            $("#acce").click(function () {
              e.sort(function (t, e) {
                return t.data.count - e[1].count;
              }),
                $("#districtsInfo").html(makeul(e));
            }),
            $("#dec").click(function () {
              e.sort(function (t, e) {
                return e[1].count - t.data.count;
              }),
                $("#districtsInfo").html(makeul(e));
            });
        })
        .fail(function () {
          showToast("Something went wrong!");
        });
    });

