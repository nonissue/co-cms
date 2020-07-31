import { useState } from 'react';
import Router from 'next/router';
import { useSession } from 'next-auth/client';

import AdminLayout from '../../../components/admin-layout';
import styles from './create.module.css';

function Create() {
  const [session, loading] = useSession();

  const [lateData, setLateData] = useState({
    title: '',
    url: '',
    shared: false,
    error: '',
    tags: [],
  });

  async function handleSubmit(event) {
    event.preventDefault();
    setLateData({ ...lateData, error: '' });

    const title = lateData.title || 'untitled';
    const url = lateData.url;
    const shared = lateData.shared || false;
    // If no tags are provided, set tags to empty array
    // Otherwise, Split on space, then filter so result
    //  so we don't create tags for submissions like " ", "1        "
    // (Prime candidate for testing)
    const tagsSplit =
      lateData.tags?.split(' ').filter((tag) => tag.length > 0) || [];

    console.log(lateData);
    console.log(session.user);

    try {
      const response = await fetch('/api/lates/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          url,
          shared,
          user: session.user,
          tags: tagsSplit,
        }),
      });

      if (response.status !== 200) {
        throw new Error(await response.text());
      }

      Router.push('/admin');
    } catch (error) {
      if (error.message === 'URL is required') {
        setLateData({
          ...lateData,
          error: {
            message: error.message,
            field: 'URL',
          },
        });
      } else if (error.message === 'Title is required') {
        setLateData({
          ...lateData,
          error: {
            message: error.message,
            field: 'Title',
          },
        });
      } else {
        setLateData({
          ...lateData,
          error: error.message,
        });
      }
    }
  }

  return (
    <AdminLayout>
      {/* Ugly nested ternary, fix? */}
      {loading ? (
        ''
      ) : !session ? (
        'Please sign in'
      ) : (
        <div className={styles['create-late']}>
          <h1>Create Late</h1>
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

            <div className={styles['form-group-row']}>
              <label htmlFor='tags'>Tags</label>
              <div>
                <input
                  type='text'
                  id='tags'
                  name='tags'
                  value={lateData.tags}
                  className={`${
                    lateData.error?.field === 'Tags' &&
                    styles['form-invalid-input']
                  }
                  ${styles['create-late-input']}
                }`}
                  onChange={(event) =>
                    setLateData(
                      Object.assign({}, lateData, { tags: event.target.value })
                    )
                  }
                />
              </div>
              <div
                className={`${styles['form-help-text']} ${styles['form-inline-error']}`}
              >
                {/* show the validation error for set amount of time? */}
                {lateData.error?.field === 'Tags' ? (
                  <div className={`${styles['form-inline-error']}`}>
                    Error processing tags
                  </div>
                ) : (
                  'Enter tags delimited by spaces (optional)'
                )}
              </div>
            </div>

            <div className={styles['form-group-row']}>
              <label>Shared</label>
              <div>
                <input
                  type='checkbox'
                  name='shared'
                  checked={lateData.shared}
                  onChange={(event) =>
                    setLateData((lateData) =>
                      Object.assign({}, lateData, {
                        shared: !lateData.shared,
                      })
                    )
                  }
                ></input>
              </div>
            </div>

            <div className={`${styles['form-group-row']}`}>
              <button type='submit'>Submit Late</button>
            </div>
          </form>
        </div>
      )}
    </AdminLayout>
  );
}

export default Create;
