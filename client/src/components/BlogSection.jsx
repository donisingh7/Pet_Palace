// src/components/BlogSection.jsx
import React from 'react';
import './BlogSection.css';  // create this file next to it

const blogs = [
    {
        title: 'Why Vaccines Matter',
        excerpt: 'Learn how timely vaccinations keep your furry friends safe from common diseases and improve their overall health.',
        url: '/blog/vaccines',
        imgUrl: '/assets/thumb-vaccines.jpg',
      },
      {
        title: 'Homemade Pet Remedies',
        excerpt: 'Discover simple, home-made remedies using natural ingredients to soothe your pet’s minor ailments at home.',
        url: '/blog/remedies',
        imgUrl: '/assets/thumb-remedies.jpg',
      },
      {
        title: 'Grooming on a Budget',
        excerpt: 'Top tricks and tips to keep your pet looking sharp and clean without breaking the bank on salon visits.',
        url: '/blog/grooming',
        imgUrl: '/assets/thumb-grooming.jpg',
      },
      {
        title: 'Nutrition Myths',
        excerpt: 'Debunking common pet-food myths so you can choose the best diet for your cat or dog.',
        url: '/blog/nutrition',
        imgUrl: '/assets/thumb-nutrition.jpg',
      },
    ];

    export default function BlogSection() {
        return (
          <section className="blog-section">
            <div className="blog-list">
              {blogs.map((b, i) => (
                <div key={i} className="blog-item">
                  <img src={b.imgUrl} alt={b.title} className="blog-thumb" />
                  <div className="blog-content">
                    <h3>{b.title}</h3>
                    <p>{b.excerpt}</p>
                    <a href={b.url} className="read-more">Read more →</a>
                  </div>
                </div>
              ))}
            </div>
            <div className="separator" />
            <div className="blog-image">
              <img
                src="/assets/poor-condition-pet.gif"
                alt="Pet in need of care"
              />
            </div>
          </section>
        );
      }
