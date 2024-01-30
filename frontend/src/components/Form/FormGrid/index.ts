import styled from "styled-components";

import { BaseExtendableProps } from "@/components/ExtendableProps";

export const Row = styled(BaseExtendableProps)`
	display: flex;
	align-items: center;
`;

export const Column = styled(BaseExtendableProps)`
	display: flex;
	flex-direction: column;
`;