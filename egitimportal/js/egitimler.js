

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

    const cachedData = localStorage.getItem('tutorData'); // Daha önce saklanmış veriyi al
    
    
      // Eğer önbellekte veri varsa, bunu kullan
      console.log(cachedData);
      
      
     console.log("aldı");
      try {
        $.ajax({
          url: 'http://localhost:3000/getTutors',
          method: 'GET',
          dataType: 'json',
          success: function (tutorData) {
            console.log(tutorData);
            localStorage.setItem('tutorData', JSON.stringify(tutorData)); // Tarayıcı belleğine kaydet
            
          },
          error: function (error) {
            console.error(error);
          }
        });
      } catch (error) {
        console.error(error);
      }
    

    $(".course-box").click(function() {
        var clickedRow = $(this).parent(); // Tıklanan kutunun bulunduğu satır
        var clickedIndex = $(this).index(); // Tıklanan kutunun index'i
        const cachedData = JSON.parse(localStorage.getItem('tutorData'));
        console.log("sdsdsddssddsd");
        console.log(cachedData);
        console.log("sdsdsddssddsd");
        // Genişlenmiş kutuya tıklandığında eski haline döndür
        if ($(this).hasClass("expanded")) {
            clickedRow.children(".course-box").show();
            $(this).removeClass("expanded");
        } else {
            // Diğer genişlenmiş kutuları küçült ve tüm satırı göster
            $(".course-box.expanded").removeClass("expanded").parent().show();
            
            // Tıklanan kutuyu genişlet
            $(this).addClass("expanded");
            
            // Tıklanan kutunun satırındaki diğer kutuları gizle
            if(clickedIndex==0)
                {
                console.log(clickedIndex);
                const courseSection = $('.courses-section'); // Eğitim kutularının olduğu bölümü seç
                const tutor = cachedData.find(tutor => tutor.id === 1); // ID'si 1 olan tutor'ı bul
                console.log(tutor);
                const courseBox = courseSection.find(".course-box").eq(0); // İlk course-box elementini seç
                console.log(courseBox);

                if (tutor) {
                    const courseThumbnail = courseBox.find(".course-thumbnail");
                    const courseDetails = courseBox.find(".course-details");
                    const courseInfo = courseBox.find(".course-info");
                    const instructorPhoto = courseBox.find(".instructor-photo");
                    const instructorDetails = courseBox.find(".instructor-details");

                    courseThumbnail.html(`<img src="images/devops.png" alt="Ders Fotoğrafı">
                                        <h4>Yazılım Analiz ve Tasarım</h4>`);

                    instructorPhoto.html(`<img src="${tutor.resim_yolu}" alt="Eğitimci Fotoğrafı">`);

                    instructorDetails.html(`<p>Eğitmen: ${tutor.isim}</p>
                                        <p>Uzmanlık Alanı: ${tutor.uzmanlik}</p>
                                        <p>Eğitim Bilgisi: ${tutor.egitim}</p>
                                        <p>Deneyim: ${tutor.deneyim}</p>
                                        <p>İletişim: ${tutor.iletisim}</p>`);
                    }
                    clickedRow.children(".course-box").eq(clickedIndex +1).hide();
                    clickedRow.children(".course-box").eq(clickedIndex +2).hide();
                                
                                
                }
            if(clickedIndex==2)
            {   console.log(clickedIndex);
                const courseSection = $('.courses-section'); // Eğitim kutularının olduğu bölümü seç
                const tutor = cachedData.find(tutor => tutor.id === 3); // ID'si 1 olan tutor'ı bul
                console.log(tutor);
                const courseBox = courseSection.find(".course-box").eq(2); // İlk course-box elementini seç
                console.log(courseBox);

                if (tutor) {
                    const courseThumbnail = courseBox.find(".course-thumbnail");
                    const courseDetails = courseBox.find(".course-details");
                    const courseInfo = courseBox.find(".course-info");
                    const instructorPhoto = courseBox.find(".instructor-photo");
                    const instructorDetails = courseBox.find(".instructor-details");

                    courseThumbnail.html(`<img src="images/sql.png" alt="Ders Fotoğrafı">
                                        <h4>Veritabanı Temelleri</h4>`);

                    instructorPhoto.html(`<img src="${tutor.resim_yolu}" alt="Eğitimci Fotoğrafı">`);

                    instructorDetails.html(`<p>Eğitmen: ${tutor.isim}</p>
                                        <p>Uzmanlık Alanı: ${tutor.uzmanlik}</p>
                                        <p>Eğitim Bilgisi: ${tutor.egitim}</p>
                                        <p>Deneyim: ${tutor.deneyim}</p>
                                        <p>İletişim: ${tutor.iletisim}</p>`);
                    }
                clickedRow.children(".course-box").eq(clickedIndex -1).hide();
                clickedRow.children(".course-box").eq(clickedIndex -2).hide();
            }
            if(clickedIndex==1)

            {
                console.log(clickedIndex);
                const courseSection = $('.courses-section'); // Eğitim kutularının olduğu bölümü seç
                const tutor = cachedData.find(tutor => tutor.id === 2); // ID'si 1 olan tutor'ı bul
                console.log(tutor);
                const courseBox = courseSection.find(".course-box").eq(1); // İlk course-box elementini seç
                console.log(courseBox);

                if (tutor) {
                    const courseThumbnail = courseBox.find(".course-thumbnail");
                    const courseDetails = courseBox.find(".course-details");
                    const courseInfo = courseBox.find(".course-info");
                    const instructorPhoto = courseBox.find(".instructor-photo");
                    const instructorDetails = courseBox.find(".instructor-details");

                    courseThumbnail.html(`<img src="images/webmobil.png" alt="Ders Fotoğrafı">
                                        <h4>Web ve Mobile Yazılım Geliştirme</h4>`);

                    instructorPhoto.html(`<img src="${tutor.resim_yolu}" alt="Eğitimci Fotoğrafı">`);

                    instructorDetails.html(`<p>Eğitmen: ${tutor.isim}</p>
                                        <p>Uzmanlık Alanı: ${tutor.uzmanlik}</p>
                                        <p>Eğitim Bilgisi: ${tutor.egitim}</p>
                                        <p>Deneyim: ${tutor.deneyim}</p>
                                        <p>İletişim: ${tutor.iletisim}</p>`);
                    }
                //clickedRow.children(".course-box").not(this).hide();
                clickedRow.children(".course-box").eq(clickedIndex - 1).hide();
            clickedRow.children(".course-box").eq(clickedIndex + 1).hide();
            }

            if(clickedIndex==3)
            {
                console.log(clickedIndex);
                const courseSection = $('.courses-section'); // Eğitim kutularının olduğu bölümü seç
                const tutor = cachedData.find(tutor => tutor.id === 4); // ID'si 1 olan tutor'ı bul
                console.log(tutor);
                const courseBox = courseSection.find(".course-box").eq(3); // İlk course-box elementini seç
                console.log(courseBox);

                if (tutor) {
                    const courseThumbnail = courseBox.find(".course-thumbnail");
                    const courseDetails = courseBox.find(".course-details");
                    const courseInfo = courseBox.find(".course-info");
                    const instructorPhoto = courseBox.find(".instructor-photo");
                    const instructorDetails = courseBox.find(".instructor-details");

                    courseThumbnail.html(`<img src="images/ag.png" alt="Ders Fotoğrafı">
                                        <h4>Ağ Temelleri</h4>`);

                    instructorPhoto.html(`<img src="${tutor.resim_yolu}" alt="Eğitimci Fotoğrafı">`);

                    instructorDetails.html(`<p>Eğitmen: ${tutor.isim}</p>
                                        <p>Uzmanlık Alanı: ${tutor.uzmanlik}</p>
                                        <p>Eğitim Bilgisi: ${tutor.egitim}</p>
                                        <p>Deneyim: ${tutor.deneyim}</p>
                                        <p>İletişim: ${tutor.iletisim}</p>`);
                    }
                clickedRow.children(".course-box").eq(clickedIndex +1).hide();
                clickedRow.children(".course-box").eq(clickedIndex +2).hide();
            }
            if(clickedIndex==4)
            {   
                console.log(clickedIndex);
                const courseSection = $('.courses-section'); // Eğitim kutularının olduğu bölümü seç
                const tutor = cachedData.find(tutor => tutor.id === 5); // ID'si 1 olan tutor'ı bul
                console.log(tutor);
                const courseBox = courseSection.find(".course-box").eq(4); // İlk course-box elementini seç
                console.log(courseBox);

                if (tutor) {
                    const courseThumbnail = courseBox.find(".course-thumbnail");
                    const courseDetails = courseBox.find(".course-details");
                    const courseInfo = courseBox.find(".course-info");
                    const instructorPhoto = courseBox.find(".instructor-photo");
                    const instructorDetails = courseBox.find(".instructor-details");

                    courseThumbnail.html(`<img src="images/web.png" alt="Ders Fotoğrafı">
                                        <h4>Frontend Teknolojileri</h4>`);

                    instructorPhoto.html(`<img src="${tutor.resim_yolu}" alt="Eğitimci Fotoğrafı">`);

                    instructorDetails.html(`<p>Eğitmen: ${tutor.isim}</p>
                                        <p>Uzmanlık Alanı: ${tutor.uzmanlik}</p>
                                        <p>Eğitim Bilgisi: ${tutor.egitim}</p>
                                        <p>Deneyim: ${tutor.deneyim}</p>
                                        <p>İletişim: ${tutor.iletisim}</p>`);
                    }

                //clickedRow.children(".course-box").not(this).hide();
                clickedRow.children(".course-box").eq(clickedIndex - 1).hide();
                clickedRow.children(".course-box").eq(clickedIndex + 1).hide();
            
            }
            if(clickedIndex==5)
            {   
                console.log(clickedIndex);
                const courseSection = $('.courses-section'); // Eğitim kutularının olduğu bölümü seç
                const tutor = cachedData.find(tutor => tutor.id === 6); // ID'si 1 olan tutor'ı bul
                console.log(tutor);
                const courseBox = courseSection.find(".course-box").eq(5); // İlk course-box elementini seç
                console.log(courseBox);

                if (tutor) {
                    const courseThumbnail = courseBox.find(".course-thumbnail");
                    const courseDetails = courseBox.find(".course-details");
                    const courseInfo = courseBox.find(".course-info");
                    const instructorPhoto = courseBox.find(".instructor-photo");
                    const instructorDetails = courseBox.find(".instructor-details");

                    courseThumbnail.html(`<img src="images/isletim.png" alt="Ders Fotoğrafı">
                                        <h4>İşletim Sistemleri</h4>`);

                    instructorPhoto.html(`<img src="${tutor.resim_yolu}" alt="Eğitimci Fotoğrafı">`);

                    instructorDetails.html(`<p>Eğitmen: ${tutor.isim}</p>
                                        <p>Uzmanlık Alanı: ${tutor.uzmanlik}</p>
                                        <p>Eğitim Bilgisi: ${tutor.egitim}</p>
                                        <p>Deneyim: ${tutor.deneyim}</p>
                                        <p>İletişim: ${tutor.iletisim}</p>`);
                    }
                clickedRow.children(".course-box").eq(clickedIndex -1).hide();
                clickedRow.children(".course-box").eq(clickedIndex -2).hide();
            }

            
        }
    });
});



