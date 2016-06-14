$(document).ready(function () {
  $(".js-toggle").on("click", function () {
    event.stopPropagation();
    $(this).toggleClass("active");
  });

  $("body").on("click", function () {
    $(".dropdown").removeClass("active");
    $(".dropdown").find(".button").removeClass("active");
  });

  $(".dropdown .list .item").on("click", function () {
    $(this).parent().parent().find(".button").text($(this).text());
  });
});

