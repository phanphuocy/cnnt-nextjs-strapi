import Layout from '@/components/layout';
import { API_URL } from '@/config/index';
import client from '@/config/apollo-client';
import { gql } from '@apollo/client';
import ReactPlayer from 'react-player/youtube';
import { getYoutubeThumbnail } from '@/libs/get-youtube-thumbnails';

export default function MusicVideoDetailPage({ video }) {
  return (
    <Layout
      title={`${video.englishTitle} ${
        video.thaiTitle === video.englishTitle ? video.thaiTitle : ''
      } lyrics, lời dịch`}
    >
      <h1 className="font-bold text-2xl my-4">{video.englishTitle}</h1>
      <div className="grid grid-cols-5 items-stretch gap-16">
        <div className="col-span-3 self-stretch">
          <div class="sticky top-10 dark:bg-gray-800">
            <div className="relative bg-gray-100 p-6 rounded-md">
              <ReactPlayer
                className="relative z-10 overflow-hidden rounded-md"
                width="100%"
                height="480px"
                playing
                url={`https://www.youtube.com/watch?v=${video.youtubeVideoId}`}
              />
              <img
                className="absolute top-0 left-0 w-full h-full z-0 filter blur-2xl"
                src={getYoutubeThumbnail(video.youtubeVideoId, 'medium')}
                alt="BG"
              />
            </div>
            <div className="py-4">
              <p className="text-sm">Performed by:</p>
              {video.originallyPerformedBy.map((artist) => (
                <div>{artist.artName}</div>
              ))}
            </div>
            <div>
              <p className="text-sm">Lời dịch:</p>
              {video.translations.length <= 0 && <div>0</div>}
              {video.translations.length > 0 && (
                <div>
                  {video.translations.map((item) => (
                    <div
                      key={item.author}
                      className="rounded-md px-6 py-4 bg-gray-50 hover:bg-orange-200"
                    >
                      {item.author}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <article className="col-span-2 dark:text-gray-200">
          {video.lyrics.split('\n').map((paragraph) => {
            if (paragraph === '') {
              return <div className="my-5"></div>;
            } else {
              return <p className="text-lg">{paragraph}</p>;
            }
          })}
        </article>
      </div>
      <div className="mt-16 w-full bg-gray-200 h-4"></div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const {
    params: { slug },
  } = context;
  const res = await fetch(`${API_URL}/music-videos?slug=${slug}`);
  const data = await res.json();

  return { props: { video: data[0] } };
}
