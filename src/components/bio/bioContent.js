import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export default () => {
	const FETCH_BIO_CONTENT = gql`
		query {
			allCopys {
				edges {
					node {
						bio
						content
					}
				}
			}
		}
	`;
	const { data, loading } = useQuery(FETCH_BIO_CONTENT);

	return loading ? false : data.allCopys.edges[0].node;
};
