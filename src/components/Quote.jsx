import React from 'react';
import '../styles/Quote.css';

const Quote = () => {
  return (
    <section className="quote-section">
      <div className="container">
        <div className="quote-content" lang="ar" dir="rtl">
          <i className="bi bi-quote" aria-hidden="true"></i>
          <p>
            {'.. نسير في الدنيا لا نملك أماناً سوى الله .. ولا أملاً إلا إيماننا فيه .. ولا قوةً إلا بالإستعانة به'}
            <br />
            {'وهو حسبنا ويكفينا'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Quote;
