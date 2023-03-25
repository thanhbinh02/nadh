import { Table } from 'antd';

const changeTime = (number) => {
  const date = new Date(number);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
};

export const TableActivityLogs = ({ data }) => {
  const columns = [
    {
      title: 'Date & Time',
      dataIndex: 'time',
      render: (text) => {
        return <div>{changeTime(Number(text))}</div>;
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: () => {
        return <div>Edit</div>;
      },
    },
    {
      title: 'Field',
      dataIndex: 'field',
      render: (text) => {
        return <div style={{ fontWeight: 500 }}>{text}</div>;
      },
    },
    {
      title: 'Detail',
      dataIndex: 'current_value',
      render: (text, record) => {
        if (record.action === 'edit_remove') {
          return (
            <div>
              Edit: remove {` `}
              <span
                style={{
                  textDecorationLine: 'line-through',
                  fontWeight: '500',
                }}
              >
                "{record?.previous_value}"
              </span>
            </div>
          );
        }

        if (record.action === 'edit_add') {
          return (
            <div>
              Edit: add "
              <span
                style={{
                  fontWeight: '500',
                }}
              >
                {text}
              </span>
              "
            </div>
          );
        }

        if (record.action === 'edit') {
          return (
            <div>
              Edit: remove {` `}
              <span
                style={{
                  textDecorationLine: 'line-through',
                  fontWeight: '500',
                }}
              >
                "{record.previous_value} " {` `}
              </span>
              to <span style={{ fontWeight: 500 }}>{text}</span>
            </div>
          );
        }
      },
    },
    {
      title: 'By',
      dataIndex: 'admin',
      render: (text) => {
        return <div style={{ textTransform: 'capitalize' }}>{text}</div>;
      },
    },
  ];

  const dataTable = data?.map((item) => ({
    key: item?.id,
    time: item?.time,
    action: item?.action,
    field: item?.field,
    previous_value: item?.previous_value,
    current_value: item?.current_value,
    admin: item?.user?.full_name,
  }));

  return (
    <Table
      columns={columns}
      dataSource={dataTable}
      pagination={{
        pageSize: 5,
        showSizeChanger: false,
        showQuickJumper: true,
      }}
    />
  );
};
