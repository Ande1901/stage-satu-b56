class Testimonial {
  constructor(image, content, author) {
    this.image = image;
    this.content = content;
    this.author = author;
  }

  html() {
    return `<div class="testimonial">
          <img
            src="${this.image}"
            class="profile-testimonial"
          />
          <p class="quote">${this.content}</p>
          <p class="author">- ${this.author}</p>
        </div>`;
  }
}

const testimonial1 = new Testimonial(
  "./assets/IMG-20240716-WA0000.jpeg",
  "keren ndee!!",
  "Ridho"
);

const testimonial2 = new Testimonial(
  "IMG-20240703-WA0000.jpg",
  "Mantap keren sekali!",
  "Cik Abang"
);

const testimonials = [testimonial1, testimonial2]; // length => 2

let testimonialHTML = ``;

for (let index = 0; index < testimonials.length; index++) {
  testimonialHTML += testimonials[index].html();
}

document.getElementById("testimonials").innerHTML = testimonialHTML;
