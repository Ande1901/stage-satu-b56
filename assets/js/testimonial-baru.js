const testimonial = [
  {
    Image: "./assets/IMG-20240716-WA0000.jpeg",
    content: "keren ndee!!",
    author: "Ridho",
    rating: 1,
  },
  {
    Image: "IMG-20240703-WA0000.jpg",
    content: "Mantap keren sekali!",
    author: "Cik Abang",
    rating: 2,
  },
  {
    Image: "IMG-20240324-WA0046.jpg",
    content: "Lingoh sekali!",
    author: "Davin",
    rating: 3,
  },
];

function allTestimonial() {
  const testimonialHTML = testimonial.map((testimonial) => {
    return `<div class="testimonial">
            <img
              src="${testimonial.Image}"
              class="profile-testimonial"
            />
            <p class="quote">${testimonial.content}</p>
            <p class="author">- ${testimonial.author}</p>
          </div>`;
  });

  document.getElementById("testimonials").innerHTML = testimonialHTML.join(" ");
}

function filterTestimonial(rating) {
  const filteredTestimonialByRating = testimonial.filter((testimonial) => {
    return testimonial.rating == rating;
  });

  const testimonialHTML = filteredTestimonialByRating.map((testimonial) => {
    return `<div class="testimonial">
                <img
                  src="${testimonial.Image}"
                  class="profile-testimonial"
                />
                <p class="quote">${testimonial.content}</p>
                <p class="author">- ${testimonial.author}</p>
              </div>`;
  });

  document.getElementById("testimonials").innerHTML = testimonialHTML.join(" ");
}

allTestimonial();
