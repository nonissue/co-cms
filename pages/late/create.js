import { useState } from 'react';
import Router from 'next/router';

import Layout from '../../components/layout';
import styles from './create.module.css';

function Create() {
  const [lateData, setLateData] = useState({
    title: '',
    url: '',
    shared: 'false',
    error: '',
  });

  async function handleSubmit(event) {
    event.preventDefault();
    setLateData({ ...lateData, error: '' });

    const title = lateData.title || 'untitled';
    const url = lateData.url;
    const shared = lateData.shared || false;

    try {
      const response = await fetch('/api/late/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, url, shared }),
      });

      if (response.status !== 200) {
        throw new Error(await response.text());
      }

      Router.push('/lates');
    } catch (error) {
      console.error(error);
      if (error.message === 'URL is required') {
        setLateData({
          ...lateData,
          error: { message: error.message, field: 'URL' },
        });
      } else if (error.message === 'Title is required') {
        setLateData({
          ...lateData,
          error: { message: error.message, field: 'Title' },
        });
      } else {
        setLateData({ ...lateData, error: error.message });
      }
    }
  }

  return (
    <Layout>
      {console.log(lateData.error)}
      <div className={styles['create-late']}>
        <h1>Create Late</h1>
        {/* <div className={styles['form-error']}>
          {lateData.error &&&& `Error: ${lateData.error}`}
        </div> */}
        <form onSubmit={handleSubmit}>
          <div className={styles['form-group-row']}>
            <label htmlFor='title'>Title</label>
            <div>
              <input
                type='text'
                id='title'
                name='title'
                value={lateData.title}
                className={`${
                  lateData.error?.field === 'Title' &&
                  styles['form-invalid-input']
                }
                  ${styles['create-late-input']}
                }`}
                onChange={(event) =>
                  setLateData(
                    Object.assign({}, lateData, { title: event.target.value })
                  )
                }
              />
            </div>
            <div className={styles['form-help-text']}>
              Enter the Late's title (optional)
            </div>
          </div>

          <div className={styles['form-group-row']}>
            <label htmlFor='summary'>URL</label>
            <div>
              <input
                type='text'
                id='url'
                name='url'
                value={lateData.url}
                className={`${
                  lateData.error?.field === 'URL' &&
                  styles['form-invalid-input']
                }
                  ${styles['create-late-input']}
                }`}
                onChange={(event) =>
                  setLateData(
                    Object.assign({}, lateData, { url: event.target.value })
                  )
                }
              />
            </div>
            <div
              className={`${styles['form-help-text']} ${styles['form-inline-error']}`}
            >
              {/* show the validation error for set amount of time? */}
              {lateData.error?.field === 'URL' ? (
                <div className={`${styles['form-inline-error']}`}>
                  This field is required
                </div>
              ) : (
                "Enter the Late's URL (required)"
              )}
            </div>
          </div>

          {/* <div className={styles['form-control-row-body']}>
            <label htmlFor='body'>Body</label>
            <div>
              <textarea
                // rows='3'
                // type='text'
                id='body'
                name='body'
                value={lateData.body}
                onChange={(event) =>
                  setLateData(
                    Object.assign({}, lateData, { body: event.target.value })
                  )
                }
              />
            </div>
          </div> */}

          {/* <div className={styles['form-control-select']}>
            <label htmlFor='body'>Categories</label>
            <div>
              <select
                id='select'
                name='select'
                // value={lateData.body}
                // onChange={(event) =>
                //   setLateData(
                //     Object.assign({}, lateData, { body: event.target.value })
                //   )
                // }
              >
                <option>test</option>
              </select>
              <label htmlFor='body'>Tags</label>
              <select
                id='select'
                name='select'
                // value={lateData.body}
                // onChange={(event) =>
                //   setLateData(
                //     Object.assign({}, lateData, { body: event.target.value })
                //   )
                // }
              >
                <option>test</option>
              </select>
            </div>
          </div> */}

          <div className={`${styles['form-group-row']}`}>
            <button type='submit'>Submit Late</button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default Create;
