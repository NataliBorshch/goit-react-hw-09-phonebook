import React, { useState, useEffect } from 'react';
import getCurrencies from '../../servise/apiCurrencies';
import styles from './Currencies.module.css';

export default function Currencies() {
  const [course, setCourse] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    getCurrencies()
      .then(data => setCourse(data))
      .catch(error => setError(error));
  }, []);

  return (
    <div className={styles.box}>
      <p className={styles.title}>Курсы валют</p>
      <table>
        <thead>
          <th>Валюта</th>
          <th>Покупка</th>
          <th>Продажа</th>
        </thead>
        <tbody>
          {course.map(item => {
            return (
              <tr>
                <td>
                  {item.base_ccy}/{item.ccy}
                </td>
                <td>{item.buy.slice(0, 5)}</td>
                <td>{item.sale.slice(0, 5)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
