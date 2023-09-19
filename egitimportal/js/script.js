$(document).ready(function() {
    // Kayıt ol butonuna tıklandığında modülü aç
    $("#openFormButton").click(function() {
        $("#signupForm").fadeIn();
    });

    // Belgenin geri kalanına tıklandığında modülü kapat
    $(document).click(function(event) {
        var target = $(event.target);
        if (!target.closest("#signupForm").length && !target.is("#openFormButton")) {
            $("#signupForm").fadeOut();
        }
    });

    // Kayıt ol butonuna tıklandığında modülü kapat
    $("#registerButton").click(function(event) {
        event.stopPropagation(); // Eğer bu satırı eklerseniz, formun dışına tıklanınca kapanmayacaktır.
        $("#signupForm").fadeOut();
    });
});



$(document).ready(function () {
    $('#registerButton').on('click', function () {
        const name = $('#isim input[name=namesurname]').val();
        const userName = $('#userName input[name=userName]').val();
        const eposta = $('#eposta input[name=eposta]').val();
        const sifre = $('#password input[name=sifre]').val();
        console.log(sifre,eposta);

        try {
            $.ajax({
                url: 'http://localhost:3000/kaydet',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({name, userName, eposta, sifre }),
                success: function (result, status, xhr) {
                    console.log(result); // Sunucudan dönen cevap (JSON)
                    console.log(status); // İstek durumu (örneğin: "success")
                    console.log(xhr.status);
                    

                    if (xhr.status === 200) {
                        // Kullanıcı bulunduğunda giriş modülünü gizle
                        if (result.message === 'Kullanıcı bulundu.') {
                            $("#signupForm").fadeOut();
                            console.log("Kullanıcı bulundu. Giriş modülü gizlendi.");
                        }
                    } else {
                        console.log("Sunucu 200 OK yanıtı dışında bir yanıt verdi.");
                    }
                    
                },
                error: function (result, status, err) {
                    console.log(result); // Sunucudan dönen cevap (JSON)
                    console.log(err); // İstek durumu (örneğin: "success")
                    console.log(xhr.status);
                    console.error('Hata:', err);
                    $('#message').text('Hata oluştu.1111');
                    
                }
                
            });
            

            
        } catch (err) {
            console.error('Hata:', err);
            $('#message').text('Hata oluştu222.');
        }
        
    });
});


$(document).ready(function () {

    var isFormOpen = false; // Modülün açık/kapalı durumunu takip etmek için bir değişken
    var hataAlindiMi = false; // Hata alınıp alınmadığını takip etmek için bir değişken

    // Kayıt ol butonuna tıklandığında modülü aç
    $("#girisButton").click(function() {
        $("#signinForm").fadeIn();
        isFormOpen = true;
    });

     // Belgenin geri kalanına tıklandığında modülü kapat
     $(document).click(function(event) {
        var target = $(event.target);
        if (!target.closest("#signinForm").length && !target.is("#girisButton") && isFormOpen) {
            $("#signinForm").fadeOut();
            isFormOpen = false; // Modül kapatıldığında durumu güncelle
        }
    });

   




    $('#loginButton1').on('click', function (event) {
        
        const userName2 = $('#aa input[name=userName2]').val();
        const sifre2 = $('#bb input[name=sifre2]').val();
        const eposta = "dssd"
        const name = "dssd"
        
       
        try {
            $.ajax({
                url: 'http://localhost:3000/check',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({name, userName2, eposta, sifre2 }),
                success: function (result, status, xhr) {
                    console.log(result); // Sunucudan dönen cevap (JSON)
                    console.log(status); // İstek durumu (örneğin: "success")
                    console.log(xhr.status);
                    console.log("çalıştı bu sefer");
                    localStorage.setItem('userId', result.userId);
                    

                    if (xhr.status === 200) {
                        // Kullanıcı bulunduğunda giriş modülünü gizle
                        if (result.message === 'Kullanıcı bulundu.') {
                            $("#signinForm").fadeOut();
                            console.log("Kullanıcı bulundu. Giriş modülü gizlendi.");
                        }
                    } else {
                        console.log("Sunucu 200 OK yanıtı dışında bir yanıt verdi.");
                    }
                     // Diğer durumlarda formun kapanmasını gerçekleştir
                    $("#signinForm").fadeOut();
                    isFormOpen = false;
                    // Belirli bir sayfaya yönlendir
                    window.location.href = "home.html";
                    
                },
                error: function (result, status, err) {
                    if (!hataAlindiMi) { // Sadece hata mesajı eklenmediyse işlem yap
                        console.error('Hata: Böyle bir kullanıcı bulunmamaktadır.');
                        hataAlindiMi = true; // Hata alındığını işaretle
                        console.log(hataAlindiMi);
                        
                        // Kullanıcı adı inputunun üstüne hata mesajını ekleyelim
                        var errorMessage = document.createElement("label");
                        errorMessage.className = "text-danger";
                        errorMessage.textContent = "Kullanıcı bulunmamaktadır.";
                        
                        var userNameInput = document.getElementById("form3Example3c");
                        var userNameInputParent = userNameInput.parentElement;
                        userNameInputParent.insertBefore(errorMessage, userNameInput);
                    }
                    
                    return;
                }
                
            });
            

            
        } catch (err) {
            console.error('Hata:', err);
            $('#message').text('Hata oluştu222.');
        }
        
        
    });
});




$(document).ready(function() {
    var slideIndex = 1;
    showSlides(slideIndex);

    function showSlides(index) {
        var i;
        var slides = $(".slides img");
        var dots = $(".dot");

        if (index > slides.length) {
            slideIndex = 1;
        } else if (index < 1) {
            slideIndex = slides.length;
        }

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    }

    $(".dot").click(function() {
        var clickedIndex = $(this).index() + 1;
        showSlides(slideIndex = clickedIndex);
    });
});








