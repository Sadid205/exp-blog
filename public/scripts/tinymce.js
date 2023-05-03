window.onload = function () {
    tinymce.init({
        selector: '#tiny-mce-post-body',
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tableofcontents footnotes mergetags autocorrect typography inlinecss',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        height:500,
        automatic_uploads: true,
        images_upload_url: '/uploads/postimage',
        relative_urls: false,
        images_upload_handler: function(blobInfo, success,failure) {
            let headers = new Headers()
            headers.append('Accept', 'Application/JSON')


            let formData = new FormData()
            formData.append('post-image', blobInfo.blob(), blobInfo.filename())

            let req = new Request('/uploads/postimage', {
                method: 'POST',
                headers, 
                mode:'cors', 
                body: formData
            })

            fetch(req)
                .then(res => res.json())
                .then(data => success(data.imgUrl))
                .catch(() => failure('HTTP Error'))
        }
    })
}