import Layout from '@/components/layout';
import client from '@/config/apollo-client';
import { gql } from '@apollo/client';

export default function ProfilesPage({ profiles }) {
  return (
    <Layout title="Profiles">
      <h1>Profiles</h1>
      <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {profiles.map((item) => (
          <div className="bg-gray-100 px-3 py-4 rounded-md" key={item.id}>
            {item.artName}
          </div>
        ))}
      </ul>
    </Layout>
  );
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query {
        profiles {
          artName
        }
      }
    `,
  });

  const { profiles } = data;

  return { props: { profiles } };
}
