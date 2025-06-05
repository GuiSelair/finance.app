import styled from 'styled-components';

export const Table = styled.table`
	width: 100%;
	border-collapse: separate;
	border-spacing: 0 0.5rem;
	text-align: left;
	margin-top: 1rem;
`;

export const TableHeadCell = styled.th`
	font-weight: 400;
	color: ${props => props.theme.colors.gray300};
	border-bottom: 1px solid ${props => props.theme.colors.gray100};
	padding-bottom: 0.5rem;
	width: auto;
`;

export const TableCell = styled.td`
	width: auto;
	padding: 0.5rem 0.5rem 0.5rem 0;
	max-width: 150px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

export const TableRow = styled.tr`
	&:nth-child(even) {
		background-color: #fafafa;
	}
`;
