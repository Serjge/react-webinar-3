import {useCallback, useEffect, useMemo, useState} from "react";
import useServices from "src/hooks/use-services";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const {i18n} = useServices();

  const [currentLang, setCurrentLang] = useState(i18n.getLang());

  // Функция для смены локали
  const setLang = useCallback(lang => {
    setCurrentLang(lang)
    i18n.setLang(lang)
  }, [currentLang]);

  // Функция для локализации текстов
  const t = useCallback((text, plural) => i18n.getTranslate(text, plural, currentLang), [currentLang]);

  const unsubscribe = useMemo(() => {

    return i18n.subscribe(() => {
      setCurrentLang(i18n.getLang())
    });
  }, []);

  useEffect(() => unsubscribe, [unsubscribe]);

  return {lang: i18n.getLang(), setLang, t};
}
