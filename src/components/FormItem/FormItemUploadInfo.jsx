import { Row, Button, Col } from 'antd';
import { useDispatch } from 'react-redux';

export const FormItemUploadInfo = ({
  name,
  items,
  setItems,
  form,
  component,
  putDetail,
  id,
  detailUser,
}) => {
  const dispatch = useDispatch();

  const handleCancelClick = (itemName) => {
    const updatedItems = items.map((item) =>
      item.name === itemName ? { ...item, open: false } : item,
    );
    setItems(updatedItems);
    form.resetFields();
  };

  const handleSaveClick = (itemName) => {
    const updatedItems = items.map((item) =>
      item.name === itemName ? { ...item, open: false } : item,
    );
    setItems(updatedItems);
    const data = form.getFieldValue(name);

    if (name === 'fax' || name === 'phone') {
      const newData = {
        id: id,
        params: {
          [`${name}`]: {
            number: data?.number || 0,
            phone_code: { key: data.phone_code },
          },
        },
      };
      dispatch(putDetail(newData));
      return;
    }

    if (name === 'address') {
      let newAddress;
      if (data?.country !== undefined) {
        newAddress = Object.entries(data).reduce((acc, [key, val]) => {
          if (val !== undefined) {
            acc[key] = val;
          }
          return acc;
        }, {});
      }
      const newData = {
        id: id,
        params: {
          address: newAddress,
        },
      };
      dispatch(putDetail(newData));
      return;
    }

    if (name === 'factory_site_0') {
      const currentFactorySite = detailUser.factory_site;
      let newFactorySiteIndex;
      if (data?.country !== undefined) {
        newFactorySiteIndex = Object.entries(data).reduce((acc, [key, val]) => {
          if (val !== undefined) {
            acc[key] = val;
          }
          return acc;
        }, {});
        if (
          currentFactorySite.length === 1 ||
          currentFactorySite.length === 0
        ) {
          const newData = {
            id: id,
            params: {
              factory_site: [newFactorySiteIndex],
            },
          };
          dispatch(putDetail(newData));
          return;
        } else {
          const newData = {
            id: id,
            params: {
              factory_site: [newFactorySiteIndex, currentFactorySite[1]],
            },
          };
          dispatch(putDetail(newData));
          return;
        }
      } else {
        if (currentFactorySite.length !== 2) {
          dispatch(
            putDetail({
              id: id,
              params: {
                factory_site: [],
              },
            }),
          );
          return;
        } else {
          dispatch(
            putDetail({
              id: id,
              params: {
                factory_site: [currentFactorySite[1]],
              },
            }),
          );
          return;
        }
      }
    }

    if (name === 'factory_site_1') {
      const currentFactorySite = detailUser.factory_site;
      let newFactorySiteIndex;
      if (data?.country !== undefined) {
        newFactorySiteIndex = Object.entries(data).reduce((acc, [key, val]) => {
          if (val !== undefined) {
            acc[key] = val;
          }
          return acc;
        }, {});

        if (currentFactorySite.length === 0) {
          const newData = {
            id: id,
            params: {
              factory_site: [newFactorySiteIndex],
            },
          };
          dispatch(putDetail(newData));
          return;
        } else {
          const newData = {
            id: id,
            params: {
              factory_site: [currentFactorySite[0], newFactorySiteIndex],
            },
          };
          dispatch(putDetail(newData));
          return;
        }
      } else {
        if (currentFactorySite.length === 0) {
          dispatch(
            putDetail({
              id: id,
              params: {
                factory_site: [],
              },
            }),
          );
          return;
        } else {
          dispatch(
            putDetail({
              id: id,
              params: {
                factory_site: [currentFactorySite[0]],
              },
            }),
          );
          return;
        }
      }
    }

    if (name === 'parent_company') {
      const newData = {
        id: id,
        params: {
          parent_id: data,
        },
      };
      dispatch(putDetail(newData));
      return;
    }

    if (name === 'lead_consultants') {
      const newData = {
        id: id,
        params: {
          lead_consultants: [data],
        },
      };
      dispatch(putDetail(newData));
      return;
    }

    const newData = {
      id: id,
      params: {
        [`${name}`]: data,
      },
    };

    dispatch(putDetail(newData));
  };

  return (
    <Row>
      <Col span={24}> {component}</Col>
      <Col span={24} style={{ textAlign: 'right', marginTop: '12px' }}>
        <Button
          style={{ marginRight: '12px' }}
          size="small"
          onClick={() => handleCancelClick(name)}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={() => handleSaveClick(name)}
        >
          Save
        </Button>
      </Col>
    </Row>
  );
};
