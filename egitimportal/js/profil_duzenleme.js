    let selectedLanguages = '';

    $(document).ready(function() {
        $('#programmingLanguages').on('click', 'option', function() {
            const selectedLanguageText = $(this).text();
            selectedLanguages += selectedLanguageText + ', ';
            console.log(selectedLanguages);

            const selectedLanguage = $('<span>', {
                class: 'selected-language',
                text: selectedLanguageText
            }).appendTo('#selectedLanguages');

            $(this).prop('disabled', true); // Seçilen dili devre dışı bırak
        });

        $('#selectedLanguages').on('click', '.selected-language', function() {
            const selectedLanguageText = $(this).text();
            selectedLanguages = selectedLanguages.replace(selectedLanguageText + ', ', '');
            console.log(selectedLanguages);

            $('#programmingLanguages option').each(function() {
                if ($(this).text() === selectedLanguageText) {
                    $(this).prop('disabled', false); // Devre dışı bırakılan dili etkinleştir
                    return false; // Döngüden çık
                }
            });

            $(this).remove(); // Seçilen dili listeden kaldır
        });

        $('#programmingLanguages').on('dblclick', 'option', function() {
            const selectedLanguageText = $(this).text();
            selectedLanguages += selectedLanguageText + ', ';
            console.log(selectedLanguages);

            $('#selectedLanguages').append($('<span>', {
                class: 'selected-language',
                text: selectedLanguageText
            }));

            $(this).prop('disabled', true); // Seçilen dili devre dışı bırak
        });
    });

    let selectedTechnologies = '';

    $(document).ready(function() {
        $('#technologies').on('click', 'option', function() {
            const selectedTechnologyText = $(this).text();
            selectedTechnologies += selectedTechnologyText + ', ';
            console.log(selectedTechnologies);

            const selectedTechnology = $('<span>', {
                class: 'selected-technology',
                text: selectedTechnologyText
            }).appendTo('#selectedTechnologies');

            $(this).prop('disabled', true); // Seçilen teknolojiyi devre dışı bırak
        });

        $('#selectedTechnologies').on('click', '.selected-technology', function() {
            const selectedTechnologyText = $(this).text();
            selectedTechnologies = selectedTechnologies.replace(selectedTechnologyText + ', ', '');
            console.log(selectedTechnologies);

            $('#technologies option').each(function() {
                if ($(this).text() === selectedTechnologyText) {
                    $(this).prop('disabled', false); // Devre dışı bırakılan teknolojiyi etkinleştir
                    return false; // Döngüden çık
                }
            });

            $(this).remove(); // Seçilen teknolojiyi listeden kaldır
        });

        $('#technologies').on('dblclick', 'option', function() {
            const selectedTechnologyText = $(this).text();
            selectedTechnologies += selectedTechnologyText + ', ';
            console.log(selectedTechnologies);

            $('#selectedTechnologies').append($('<span>', {
                class: 'selected-technology',
                text: selectedTechnologyText
            }));

            $(this).prop('disabled', true); // Seçilen teknolojiyi devre dışı bırak
        });
    });

    $(document).ready(function() {
        $('#guncelle').click(function(event) {
            event.preventDefault(); // Formun normal submit işlemini engelle
            const userId= localStorage.getItem('userId');
            const name = $('#name').val();
            const username = $('#username').val();
            const email = $('#email').val();
            const password = $('#password').val();
            console.log(userId);
            const formData = {
                id:userId,
                name: name,
                username: username,
                email: email,
                password: password
            };

            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/update-profile', // Sunucu tarafının endpointi
                data: formData,
                success: function(response) {
                    alert(response); // Sunucudan gelen yanıtı göster
                },
                error: function() {
                    alert('Bir hata oluştu. Profil güncellenemedi.');
                }
            });
        });
    });


    $(document).ready(function() {
        $('#gonder').on('click', function(event) {
            event.preventDefault(); // Formun varsayılan gönderimini engelle

            const selectedLanguages = [];
            $('#selectedLanguages .selected-language').each(function() {
                selectedLanguages.push($(this).text());
            });

            const selectedTechnologies = [];
            $('#selectedTechnologies .selected-technology').each(function() {
                selectedTechnologies.push($(this).text());
            });
            const userId= localStorage.getItem('userId');
            const universite = $('#education').val();
            const bolum = $('#bolum').val();
            const dil = $('#dil').val();
            const github = $('#github').val();
            const linkedin = $('#linkedin').val();

            // Verileri sunucuya göndermek için AJAX kullanımı
            $.ajax({
                url: 'http://localhost:3000/save', // Verileri kaydedeceğiniz sunucu rotası
                method: 'POST',
                data: {
                    selectedLanguages: selectedLanguages,
                    selectedTechnologies: selectedTechnologies,
                    userId:userId,
                    universite:universite,
                    bolum:bolum,
                    dil: dil,
                    github: github,
                    linkedin: linkedin
                },
                success: function(response) {
                    console.log('Veriler başarıyla kaydedildi:', response);
                },
                error: function(error) {
                    console.error('Hata oluştu:', error);
                }
            });
        });
    });