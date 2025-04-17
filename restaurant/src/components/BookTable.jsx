import { useTranslation } from 'react-i18next';

const BookTable = () => {
  const { t } = useTranslation();

  return (
    <section id="book-a-table" className="book-a-table section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>{t('book_a_table.section_title.main')}</h2>
        <p>{t('book_a_table.section_title.subtitle')}</p>
      </div>
      {/* End Section Title */}
      <div className="container" data-aos="fade-up" data-aos-delay={100}>
        <form
          action="forms/book-a-table.php"
          method="post"
          role="form"
          className="php-email-form"
        >
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6">
              <input
                type="text"
                name="name"
                className="form-control"
                id="name"
                placeholder={t('book_a_table.form.name')}
                required=""
              />
            </div>
            <div className="col-lg-4 col-md-6">
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                placeholder={t('book_a_table.form.email')}
                required=""
              />
            </div>
            <div className="col-lg-4 col-md-6">
              <input
                type="text"
                className="form-control"
                name="phone"
                id="phone"
                placeholder={t('book_a_table.form.phone')}
                required=""
              />
            </div>
            <div className="col-lg-4 col-md-6">
              <input
                type="date"
                name="date"
                className="form-control"
                id="date"
                placeholder={t('book_a_table.form.date')}
                required=""
              />
            </div>
            <div className="col-lg-4 col-md-6">
              <input
                type="time"
                className="form-control"
                name="time"
                id="time"
                placeholder={t('book_a_table.form.time')}
                required=""
              />
            </div>
            <div className="col-lg-4 col-md-6">
              <input
                type="number"
                className="form-control"
                name="people"
                id="people"
                placeholder={t('book_a_table.form.people')}
                required=""
              />
            </div>
          </div>
          <div className="form-group mt-3">
            <textarea
              className="form-control"
              name="message"
              rows={5}
              placeholder={t('book_a_table.form.message')}
              defaultValue={''}
            />
          </div>
          <div className="text-center mt-3">
            <div className="loading">{t('book_a_table.form.loading')}</div>
            <div className="error-message" />
            <div className="sent-message">
            {t('book_a_table.form.sent_message')}
            </div>
            <button type="submit">{t('book_a_table.form.submit')}</button>
          </div>
        </form>
        {/* End Reservation Form */}
      </div>
    </section>
  )
}
export default BookTable