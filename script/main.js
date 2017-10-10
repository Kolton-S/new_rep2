(function() {
  var theImages = document.querySelectorAll('.image-holder'),
  theHeading = document.querySelector('.heading'),
  theSubhead = document.querySelector('.main-copy h2'),
  theSeasonText = document.querySelector('.main-copy p'),
  appliedClass;

  function ChangeElements(){
    //make sure event handling is working

    let objectIndex = dynamicContent[this.id];
    let subImages = document.querySelector('.subImagesContainer');

    //remove all images
    while(subImages.firstChild){
      subImages.removeChild(subImages.firstChild);
    }
    //add some images at the bottom of the page
    objectIndex.images.forEach(function(image, index){
      // create a new image element
      let newSubImg = document.createElement('img');
      //add a css class
      newSubImg.classList.add('thumb');
      //add a source
      newSubImg.src = "images/" + objectIndex.images[index];

      newSubImg.dataset.index = index;
      //add event handling
      newSubImg.addEventListener('click', function() { popLightbox(index, objectIndex); }, false);

      //add it to the page
      subImages.appendChild(newSubImg);
    });

    //change color of text (backwards)
    theSubhead.classList.remove(appliedClass);
    theHeading.classList.remove(appliedClass);

    //change color of text
    theSubhead.classList.add(this.id);
    theHeading.classList.add(this.id);

    //change content of page
    //firstChild.nodeValue is the same as innerHTML kind of
    theSubhead.firstChild.nodeValue = objectIndex.headline;
    theSeasonText.firstChild.nodeValue = objectIndex.text;

    appliedClass = this.id;
  }

  theImages.forEach(function(element, index){
    //Loop through the images and add event handling to each one
    element.addEventListener('click', ChangeElements, false);
  })

  function popLightbox(currentIndex, currentObject){
    window.scrollTo(0, 0);
    let lightbox = document.querySelector('.lightbox');
    let lightboxImg = document.querySelector('.lightbox-img');
    let lightboxDesc = document.querySelector('.lightbox-desc');
    var lightboxClose = document.getElementById('close-lightbox');
    lightboxImg.src = "images/" + currentObject.images[currentIndex];
    lightboxDesc.innerHTML = currentObject.imageDescription[currentIndex];
    lightbox.style.display = 'block';
    if(lightboxClose){
      lightboxClose.addEventListener('click', closeBox, false);
    }

    function closeBox(){
      lightbox.style.display = 'none';
      lightboxImg.src = "";
      lightboxDesc.innerHTML = "null";
    }
  }



  //changeElements.call(document.querySelector('#spring'));

})();
