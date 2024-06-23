import { Table } from "@mantine/core";
import data from "../../assets/Manufac _ India Agro Dataset.json";
import "./TableTwo.css";
import { calculateCropAverages } from "../DataCalculation/getDataforTable";

const TableTwo = () => {
  const finalData = calculateCropAverages(data);

  const rows = finalData.map((row) => {
    const averageYield = row.averageYield || 0;
    const averageCultivationArea = row.averageCultivationArea || 0;
    const averageYieldRounded = averageYield.toFixed(3);
    const averageCultivationAreaRounded = averageCultivationArea.toFixed(3);
    return (
      <Table.Tr key={row.cropName}>
        <Table.Td>{row.cropName}</Table.Td>
        <Table.Td>{averageYieldRounded}</Table.Td>
        <Table.Td>{averageCultivationAreaRounded}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <div className="table-container">
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="xs">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Crop</Table.Th>
              <Table.Th>Average Yield of the Crop between 1950-2020</Table.Th>
              <Table.Th>
                Average Cultivation Area of the Crop between 1950-2020
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
};

export default TableTwo;
