import { Table } from "@mantine/core";
import data from "../../assets/Manufac _ India Agro Dataset.json";
import "./TableOne.css";
import { calculateYearlyProduction } from "../DataCalculation/getDataforTable";

const TableOne = () => {
  const finalData = calculateYearlyProduction(data);

  const rows = finalData.map((row) => {
    return (
      <Table.Tr key={row.year}>
        <Table.Td>{row.year.substring(28)}</Table.Td>
        <Table.Td>{row.maxProduction.crop}</Table.Td>
        <Table.Td>{row.minProduction.crop}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <div className="table-container">
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="xs">
          <Table.Thead>
            <Table.Tr>
              <Table.Th className="premium-header">Year</Table.Th>
              <Table.Th className="premium-header">
                Crop with Maximum Production
              </Table.Th>
              <Table.Th className="premium-header">
                Crop with Minimum Production
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
};

export default TableOne;
