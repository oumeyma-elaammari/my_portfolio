import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const SocialLinks = () => {
  const { t } = useTranslation();

  return (
    <>
      <a href="https://github.com/oumeyma-elaammari" target="_blank" rel="noopener noreferrer" aria-label={t('social.github')}>
        <FaGithub />
      </a>
      <a href="https://www.linkedin.com/in/oumeyma-el-aammari-886115244/" target="_blank" rel="noopener noreferrer" aria-label={t('social.linkedin')}>
        <FaLinkedin />
      </a>
      <a href="mailto:elaammarioumeima@gmail.com" aria-label={t('social.email')}>
        <FaEnvelope />
      </a>
    </>
  );
};

export default SocialLinks;
