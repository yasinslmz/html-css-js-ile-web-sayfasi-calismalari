
const userId= localStorage.getItem('userId');

try {
    $.ajax({
        url: `http://localhost:3000/getProfileData/${userId}`,
        method: 'GET',
        success: function(data) {
             // Kullanıcı bilgilerini güncelle
             // Yeni resim yolu oluşturma
            var newImagePath = "images/foto" + userId + ".jpg";

            // Resim öğesinin src niteliğini değiştirme
            $("#userImage").attr("src", newImagePath);

             $('#name').text(data.name);
             $('#username').text(data.username);
             $('#email').text(data.email);
             $('#github').text(data.github);
             $('#linkedin').text(data.linkedin);
             

            // Programlama dillerini göster
            $('#programmingLanguages').text(data.selectedLanguages);
            $('#technologies').text(data.selectedTechnologies);
            $('#userBolum').text(data.bolum);
            $('#userDil').text(data.dil);
            $('#userUniversite').text(data.universite);
            // Diğer verileri burada güncelleyebilirsiniz
            console.log(data);
            
            console.log(userId);
            
        },
        error: function(xhr, status, error) {
            console.error(error);
        }
    });
} catch (error) {
    console.error(error);
}
