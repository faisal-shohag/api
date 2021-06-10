function showDist() {
  $("#showDist").toggle();
}

function showCountry() {
  document.getElementById("show").style = "display: block";
}
function hidCountry() {
  document.getElementById("show").style = "display: none";
}

$("#search-text").on("keyup", function () {
  var value = $(this).val().toLowerCase();
  $("#ul li").filter(function () {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
  });
});

function openCity(evt, cityName) {
  var i, tabcontent, tablinks;

  tablinks = document.getElementsByClassName("tablinks");
  tabcontent = document.getElementsByClassName("tabcontent");
  //   tablinks[0].className = tablinks[0].className.replace(" active", "");
  //   tabcontent[0].style.display="block";
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
//$(".tablinks").click();

var Rangpur = [
  "Dinajpur",
  "Gaibandha",
  "Kurigram",
  "Lalmonirhat",
  "Nilphamari",
  "Panchagar",
  "Rangpur",
  "Thakurgaon",
];
var Barishal = [
  "Barguna",
  "Barishal",
  "Bhola",
  "Jhalokathi",
  "Potuakhali",
  "Pirojpur",
];
var Khulna = [
  "Bagerhat",
  "Chuadanga",
  "Jessore",
  "Jhenaidah",
  "Khulna",
  "Kushtia",
  "Magura",
  "Meherpur",
  "Narail",
  "Satkhira",
];
var Mymensingh = ["Jamalpur", "Mymensingh", "Netrokona", "Sherpur"];

var Rajshahi = [
  "Bogra",
  "Chapainawabganj",
  "Joypurhat",
  "Naogaon",
  "Natore",
  "Pabna",
  "Rajshahi",
  "Sirajganj",
];
var Sylhet = ["Hobiganj", "Moulovi Bazar", "Sunamganj", "Sylhet"];
var Chattogram = [
  "Bandarban",
  "B. Baria",
  "Chandpur",
  "Chattogram",
  "Cumilla",
  "Cox\u2019s bazar",
  "Feni",
  "Khagrachari",
  "Laksmipur",
  "Noakhali",
  "Rangmati",
];
var Dhaka = [
  "Dhaka City",
  "Dhaka (District)",
  "Faridpur",
  "Gazipur",
  "Gopalganj",
  "Kishoreganj",
  "Madaripur",
  "Manikganj",
  "Munshigonj",
  "Narayanganj",
  "Narshingdi",
  "Rajbari",
  "Shariatpur",
  "Tangail",
];

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    //$("#location").html("Could not get the location, Please Allow using location from your device");
  }
}

function showPosition(position) {
  //console.log(position);
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  // console.log(lat);
  // console.log(lon);
  //sending lat & lon to getlatlon function which will find your district name
  getlatlong(lat, lon);
}

$("#btn").click();

function getlatlong(lat, lon) {
  //console.log(lon);
  //grabbing your district from JSON api
  var url =
    "https://us1.locationiq.com/v1/reverse.php?key=979e07b14fb6ee&lat=" +
    lat +
    "&lon=" +
    lon +
    "&format=json";
  var settings = {
    async: true,
    crossDomain: true,
    url: url,
    method: "GET",
  };
  $.ajax(settings).done(function (response) {
    //console.log(response);
    var division = response.address.state.split(" ");
    console.log(division[0]);
    getdiv(division[0]);
  });
}

var total_count = 0;
var total_increases = 0;
function getdiv(div) {
  var inpName = div;
  $("#div").html(
    "<i class='fa fa-map-marker' aria-hidden='true'></i> " + inpName
  );
  $.getJSON("https://corona-bd.herokuapp.com/district", function (district) {
    $("#ld").hide();
    $("#update").html("Last Update: " + district.updated_on);

    for (let i = 0; i < district.data.length; ++i) {
      var name = district.data[i].name;
      var count = district.data[i].count;
      var prev_count = district.data[i].prev_count;
      var increases = Math.abs(count - prev_count);
      if (inpName == "Rangpur") {
        for (let j = 0; j < Rangpur.length; ++j) {
          if (name === Rangpur[j]) {
            const html = `
            <li  class="list-group-item d-flex justify-content-between align-items-center bg-dark text-white"> 
            <span>${name}</span> <span class=" "><h5>${count} <i class="fa fa-angle-double-up  text-warning" aria-hidden="true"><span class="up">  ${increases} </span></i></h5> </span>
            </li>
            `;
            total_count += count;
            total_increases += increases;
            $("#tc").html(
              "Total Affected: " +
                "<span class='badge badge-danger tc'>" +
                total_count +
                "</span> " +
                "<i class='fa fa-angle-double-up  text-warning' aria-hidden='true'> <span class='up'>" +
                total_increases +
                "</span></i>"
            );
            document.getElementById("dis").innerHTML += html;
          }
        }
      } else if (inpName == "Barishal") {
        for (let j = 0; j < Barishal.length; ++j) {
          if (name === Barishal[j]) {
            const html = `
            <li  class="list-group-item d-flex justify-content-between align-items-center bg-dark text-white"> 
            <span>${name}</span> <span class=" "><h5>${count} <i class="fa fa-angle-double-up  text-warning" aria-hidden="true"><span class="up">  ${increases} </span></i></h5> </span>
            </li>
            `;
            total_count += count;
            total_increases += increases;
            $("#tc").html(
              "Total Affected: " +
                "<span class='badge badge-danger tc'>" +
                total_count +
                "</span> " +
                "<i class='fa fa-angle-double-up  text-warning' aria-hidden='true'> <span class='up'>" +
                total_increases +
                "</span></i>"
            );
            document.getElementById("dis").innerHTML += html;
          }
        }
      } else if (inpName == "Khulna") {
        for (let j = 0; j < Khulna.length; ++j) {
          if (name == Khulna[j]) {
            const html = `
            <li  class="list-group-item d-flex justify-content-between align-items-center bg-dark text-white"> 
            <span>${name}</span> <span class=" "><h5>${count} <i class="fa fa-angle-double-up  text-warning" aria-hidden="true"><span class="up">  ${increases} </span></i></h5> </span>
            </li>
            `;
            total_count += count;
            total_increases += increases;
            $("#tc").html(
              "Total Affected: " +
                "<span class='badge badge-danger tc'>" +
                total_count +
                "</span> " +
                "<i class='fa fa-angle-double-up  text-warning' aria-hidden='true'> <span class='up'>" +
                total_increases +
                "</span></i>"
            );
            document.getElementById("dis").innerHTML += html;
          }
        }
      } else if (inpName == "Mymensingh") {
        for (let j = 0; j < Mymensingh.length; ++j) {
          if (name === Mymensingh[j]) {
            const html = `
            <li  class="list-group-item d-flex justify-content-between align-items-center bg-dark text-white"> 
            <span>${name}</span> <span class=" "><h5>${count} <i class="fa fa-angle-double-up  text-warning" aria-hidden="true"><span class="up">  ${increases} </span></i></h5> </span>
            </li>
            `;
            total_count += count;
            total_increases += increases;
            $("#tc").html(
              "Total Affected: " +
                "<span class='badge badge-danger tc'>" +
                total_count +
                "</span> " +
                "<i class='fa fa-angle-double-up  text-warning' aria-hidden='true'> <span class='up'>" +
                total_increases +
                "</span></i>"
            );
            document.getElementById("dis").innerHTML += html;
          }
        }
      } else if (inpName == "Sylhet") {
        for (let j = 0; j < Sylhet.length; ++j) {
          if (name === Sylhet[j]) {
            const html = `
            <li  class="list-group-item d-flex justify-content-between align-items-center bg-dark text-white"> 
            <span>${name}</span> <span class=" "><h5>${count} <i class="fa fa-angle-double-up  text-warning" aria-hidden="true"><span class="up">  ${increases} </span></i></h5> </span>
            </li>
            `;
            total_count += count;
            total_increases += increases;
            $("#tc").html(
              "Total Affected: " +
                "<span class='badge badge-danger tc'>" +
                total_count +
                "</span> " +
                "<i class='fa fa-angle-double-up  text-warning' aria-hidden='true'> <span class='up'>" +
                total_increases +
                "</span></i>"
            );
            document.getElementById("dis").innerHTML += html;
          }
        }
      } else if (inpName == "Rajshahi") {
        for (let j = 0; j < Rajshahi.length; ++j) {
          if (name === Rajshahi[j]) {
            const html = `
            <li  class="list-group-item d-flex justify-content-between align-items-center bg-dark text-white"> 
            <span>${name}</span> <span class=" "><h5>${count} <i class="fa fa-angle-double-up  text-warning" aria-hidden="true"><span class="up">  ${increases} </span></i></h5> </span>
            </li>
            `;
            total_count += count;
            total_increases += increases;
            $("#tc").html(
              "Total Affected: " +
                "<span class='badge badge-danger tc'>" +
                total_count +
                "</span> " +
                "<i class='fa fa-angle-double-up  text-warning' aria-hidden='true'> <span class='up'>" +
                total_increases +
                "</span></i>"
            );
            document.getElementById("dis").innerHTML += html;
          }
        }
      } else if (inpName == "Chattogram") {
        for (let j = 0; j < Chattogram.length; ++j) {
          if (name === Chattogram[j]) {
            const html = `
            <li  class="list-group-item d-flex justify-content-between align-items-center bg-dark text-white"> 
            <span>${name}</span> <span class=" "><h5>${count} <i class="fa fa-angle-double-up  text-warning" aria-hidden="true"><span class="up">  ${increases} </span></i></h5> </span>
            </li>
            `;
            total_count += count;
            total_increases += increases;
            $("#tc").html(
              "Total Affected: " +
                "<span class='badge badge-danger tc'>" +
                total_count +
                "</span> " +
                "<i class='fa fa-angle-double-up  text-warning' aria-hidden='true'> <span class='up'>" +
                total_increases +
                "</span></i>"
            );
            document.getElementById("dis").innerHTML += html;
          }
        }
      } else if (inpName == "Dhaka") {
        for (let j = 0; j < Dhaka.length; ++j) {
          if (name === Dhaka[j]) {
            const html = `
            <li  class="list-group-item d-flex justify-content-between align-items-center bg-dark text-white"> 
            <span>${name}</span> <span class=" "><h5>${count} <i class="fa fa-angle-double-up  text-warning" aria-hidden="true"><span class="up">  ${increases} </span></i></h5> </span>
            </li>
            `;
            total_count += count;
            total_increases += increases;
            $("#tc").html(
              "Total Affected: " +
                "<span class='badge badge-danger tc'>" +
                total_count +
                "</span> " +
                "<i class='fa fa-angle-double-up  text-warning' aria-hidden='true'> <span class='up'>" +
                total_increases +
                "</span></i>"
            );
            document.getElementById("dis").innerHTML += html;
          }
        }
      }
    }
  }).fail(err=> {
    $("#ld").hide();
    $('.dist-wrap').hide();
   Swal.fire(
     'District Data is not available now!',
     'Will be available soon.',
     'info'
   )
  })
}

function convKM(data){
  var cdata;
/*if(data>=1000 && data<10000){
     cdata = data/1000;
     cdata = cdata.toFixed(2);
     cdata = cdata.toString();
     cdata = cdata+'K';
  }else if(data>= 10000 && data<100000){
     cdata = data/10000;
     cdata = cdata.toFixed(2);
     cdata = cdata.toString();
     cdata = cdata+'M';
  }else if(data>=100000){
    cdata = data/100000;
     cdata = cdata.toFixed(2);
     cdata = cdata.toString();
     cdata = cdata+'B';
  }
  else{
    cdata = data;
  }*/
  return data;
}
/*
setTimeout(function () {
  var tc = convKM(total_count);
  if(total_increases<1) total_increases = "N/A";
    $("#tc").html(
      "Total Affected: <span  class='badge badge-danger tc'>" +
        tc +
        "</span>" +
        "<i class='fa fa-angle-double-up  text-warning' aria-hidden='true'><span class='up'>" +
        total_increases +
        "</span></i>"
    );
}, 4000);*/

$(function () {
  let baseApi = "https://coronavirus-19-api.herokuapp.com";
  hideElementsTillResponse();

  $.get(baseApi.concat("/countries/world"), function () {})
    .done(function (response) {
      setContentsOverWorldCard(response);
    })
    .fail(function () {
      //	showToast("something went wrong");
    })
    .always(function () {
      fetchBangladeshData(baseApi);
    });
});

function hideElementsTillResponse() {
  $("main").hide();
}


function setContentsOverWorldCard(data) {
  var cases = convKM(data.cases);
  var deaths = convKM(data.deaths);
  var recovered = convKM (data.recovered)
  $("#wcases").text(cases),
    $("#wdeath").text(deaths),
    $("#wrec").text(recovered);
}

function fetchBangladeshData(baseApi) {
  let foreignResidents = {
    italy: 8,
    usa: 2,
    india: 1,
    bahrain: 1,
    kuwait: 1,
    germany: 1,
  };
  $.get(baseApi.concat("/countries/bangladesh"), function () {})
    .done(function (response) {
      //	showToast("welcome");
      constructData(
        response.cases,
        response.deaths,
        response.recovered,
        response.active,
        response.todayCases,
        response.todayDeaths,
        response.totalTests,
        response.critical,
        foreignResidents
      );
      $("main").show();
    })
    .fail(function () {
      $("#ld").show();
    })
    .always(function () {
      $(".progress").hide();
      numberCounter();
    });
}

function numberCounter() {
  // $(".count").counterUp({
  //   delay: 10,
  //   time: 700
  // });

  $(".count").each(function () {
    $(this)
      .prop("Counter", 0)
      .animate(
        {
          Counter: $(this).text(),
        },
        {
          duration: 3000,
          easing: "swing",
          step: function (now) {
            $(this).text(Math.ceil(now));
          },
        }
      );
  });
}

// function showToast(message) {
//   M.toast({
//     html: message,
//     classes: "blue-grey darken-3 rounded",
//   });
// }

function constructData(
  confirmed,
  dead,
  recovered,
  active,
  today_case,
  today_death,
  total_tests,
  critical,
  fR
) {
  var cases = convKM(confirmed);
  var deaths = convKM(dead);
  var recov = convKM(recovered);
  $("#numberOfTests").text(total_tests);
  $("#total_cases").text(cases);
  $("#total_deaths").text(deaths);
  $("#rec").text(recov);

  // table data constructor
  //$("#td_total").text(confirmed);
  $("#active").text(active);
  $("#new_cases").html("<i class='fa fa-angle-double-up  text-warning' aria-hidden='true'> " + today_case + "</i>");
  $("#new_deaths").html("<i class='fa fa-angle-double-up  text-warning' aria-hidden='true'> " + today_death + "</i>");
  $("#critical").text(critical);

  // TODO: Need to find/build a real API for this case
  //$("#italy").text(fR.italy);
  $("#usa").text(fR.usa);
  // $("#india").text(fR.india);
  // $("#bahrain").text(fR.bahrain);
  // $("#kuwait").text(fR.kuwait);
  // $("#germany").text(fR.germany);
  // $("#unknown").text(
  //   confirmed -
  //     (fR.italy + fR.usa + fR.india + fR.bahrain + fR.germany + fR.kuwait)
  // );
}


$(function () {
  $(".tooltipped").tooltip(),
    $(".tabs").tabs(),
    $(".sidenav").sidenav(),
    $(".slider").slider(),
    $(".collapsible").collapsible(),
    $("#search1").on("keyup", function () {
      var a = $(this).val().toLowerCase();
      $("#locationTotal tr").filter(function () {
        $(this).toggle(-1 < $(this).text().toLowerCase().indexOf(a));
      });
    });
  var a = $(".scroll");
  a.click(function (a) {
    a.preventDefault(),
      $("body,html").animate({ scrollTop: $(this.hash).offset().top }, 1e3);
  }),
    $(window).scroll(function () {
      var b = $(this).scrollTop();
      a.each(function () {
        var a = $(this.hash).offset().top - 20;
        a <= b &&
          ($(this).parent().addClass("active"),
          $(this).parent().siblings().removeClass("active"));
      });
    });
});
