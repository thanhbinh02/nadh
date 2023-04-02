import { useParams } from 'react-router';
import { Breadcrumb, Row, Col, Button, Spin, Form, Card, Input } from 'antd';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { CardOverview } from '../../components/Card/CardOverview';
import { CardRemunerationAndRewards } from '../../components/Card/CardRemunerationAndRewards';
import { FormPersonalInformation } from '../../components/Form/FormPersonalInformation';
import { TableAcademic } from '../../components/Table/TableAcademic';
import { TableCertificate } from '../../components/Table/TableCertificate';
import { TableWorkingHistory } from '../../components/Table/TableWorkingHistory';
import { CardAttachments } from '../../components/Card/CardAttachments';
import FormSkillAndIndustry from '../../components/Form/FormSkillAndIndustry';

import {
  candidate_flow_status,
  priority_status,
  formatDate,
} from '../../utils/const';

import { fetchDetailCandidateSlice } from '../../store/detailCandidateSlice';
import { fetchDegree } from '../../store/degreeSlice';
import { fetchPhoneNumber } from '../../store/phoneNumberSlice';
import { fetchPosition } from '../../store/positionSlice';
import { fetchCountries } from '../../store/locationsSlice';
import { fetchDetailCandidateSliceNotLoading } from '../../store/detailCandidateSlice';
import { fetchFiles } from '../../store/fileSlice';
import { putNewDetailCandidate } from '../../store/detailCandidateSlice';
import { CardInterviewLoop } from '../../components/Card/CardInterviewLoop';

const { TextArea } = Input;
export const CandidateDetail = () => {
  const { candidate_id } = useParams();
  window.localStorage.removeItem('filterCDD');
  const detailCandidate = useSelector((state) => state.detailCandidate.data);
  const isSuccessDetailCandidate = useSelector(
    (state) => state.detailCandidate.isSuccess,
  );

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const listCountry = useSelector((state) => state.locations.countries);
  const degree = useSelector((state) => state.degree.data);
  const phoneNumber = useSelector((state) => state.phoneNumber.data);
  const countries = useSelector((state) => state.locations.countries);
  const files = useSelector((state) => state.file.files);

  const yearsRange = [];
  for (var i = 1960; i <= 2023; i++) {
    yearsRange.push({ key: i });
  }

  useEffect(() => {
    dispatch(fetchDetailCandidateSlice(candidate_id));
    dispatch(fetchPosition());
    dispatch(fetchDegree());
    dispatch(fetchPhoneNumber());
    dispatch(fetchCountries({ type: 4 }));
  }, []);

  useEffect(() => {
    if (isSuccessDetailCandidate) {
      if (detailCandidate?.id)
        dispatch(
          fetchFiles({
            obj_id: detailCandidate?.id,
            obj_table: 'candidates',
          }),
        );
    }
  }, [isSuccessDetailCandidate]);

  const changeValueInitialPhoneValue = (array) => {
    const result = array?.map((item) => {
      return {
        current: item.current,
        number: item.number,
        phone_code: item.phone_code.key,
      };
    });
    return result;
  };

  const initialValues = {
    certificate_text: detailCandidate?.certificate_text,
    emails: detailCandidate?.emails
      ? detailCandidate?.emails?.map((email) => ({ email }))
      : [],
    overview_text_new: detailCandidate?.overview_text_new,
    first_name: detailCandidate?.first_name,
    last_name: detailCandidate?.last_name,
    middle_name: detailCandidate?.middle_name,
    priority_status: detailCandidate?.priority_status,
    dob: detailCandidate?.dob,
    date_birthday: detailCandidate?.dob
      ? formatDate(detailCandidate?.dob).date
      : null,
    month_birthday: detailCandidate?.dob
      ? formatDate(detailCandidate?.dob).month
      : null,
    year_birthday: detailCandidate?.dob
      ? formatDate(detailCandidate?.dob).year
      : null,
    gender: detailCandidate?.gender,
    martial_status: detailCandidate?.extra?.martial_status,
    relocating_willingness: detailCandidate?.relocating_willingness,
    source: detailCandidate?.source,
    nationality: detailCandidate?.nationality,
    highest_education: detailCandidate?.highest_education,
    industry_years: detailCandidate?.industry_years || 0,
    management_years: detailCandidate?.management_years || 0,
    direct_reports: detailCandidate?.direct_reports || 0,
    phones: changeValueInitialPhoneValue(detailCandidate?.phones),
    addresses: detailCandidate?.addresses?.length
      ? detailCandidate?.addresses
      : [null],

    current_salary: detailCandidate?.remuneration?.current_salary,
    currency: detailCandidate?.remuneration?.currency?.id,
    notice_days: detailCandidate?.remuneration?.notice_days,
    salary_from: detailCandidate?.remuneration?.salary?.from,
    salary_to: detailCandidate?.remuneration?.salary?.to,

    benefit_over_thirteen:
      detailCandidate?.remuneration?.benefit?.over_thirteen,
    benefit_over_thirteen_text:
      detailCandidate?.remuneration?.benefit?.over_thirteen_text,
    benefit_lunch_check: detailCandidate?.remuneration?.benefit?.lunch_check,
    benefit_lunch_check_text:
      detailCandidate?.remuneration?.benefit?.lunch_check_text,
    benefit_car_parking: detailCandidate?.remuneration?.benefit?.car_parking,
    benefit_car_parking_text:
      detailCandidate?.remuneration?.benefit?.car_parking_text,
    benefit_car_allowance:
      detailCandidate?.remuneration?.benefit?.car_allowance,
    benefit_car_allowance_text:
      detailCandidate?.remuneration?.benefit?.car_allowance_text,
    benefit_phone: detailCandidate?.remuneration?.benefit?.phone,
    benefit_phone_text: detailCandidate?.remuneration?.benefit?.phone_text,
    benefit_laptop: detailCandidate?.remuneration?.benefit?.laptop,
    benefit_laptop_text: detailCandidate?.remuneration?.benefit?.laptop_text,
    benefit_share_option: detailCandidate?.remuneration?.benefit?.share_option,
    benefit_share_option_text:
      detailCandidate?.remuneration?.benefit?.share_option_text,
    benefit_health_cover: detailCandidate?.remuneration?.benefit?.health_cover,
    benefit_health_cover_text:
      detailCandidate?.remuneration?.benefit?.health_cover_text,
    benefit_pension_scheme:
      detailCandidate?.remuneration?.benefit?.pension_scheme,
    benefit_no_holiday: detailCandidate?.remuneration?.benefit?.no_holiday,
    benefit_working_hour: detailCandidate?.remuneration?.benefit?.working_hour,
    benefit_overtime_hour:
      detailCandidate?.remuneration?.benefit?.overtime_hour,
  };

  const flowStatus = candidate_flow_status.find(
    (item) => item.id === detailCandidate?.flow_status,
  );

  const primaryStatus = priority_status.find(
    (item) => item.id === detailCandidate?.priority_status,
  );

  const onFinishFailed = () => {
    toast.error('Please check your form!', {
      autoClose: 1000,
      position: 'top-right',
    });
  };

  const handleDispatchSave = (values) => {
    const result = {};
    for (const key in values) {
      if (key.startsWith('benefit_')) {
        const newKey = key.replace('benefit_', '');
        result.benefit = result.benefit || {};
        result.benefit[newKey] = values[key];
      } else {
        result[key] = values[key];
      }
    }

    const {
      addresses,
      benefit,
      currency,
      current_salary,
      expectations,
      future_prospects,
      notice_days,
      salary_from,
      salary_to,
      phones,
      date_birthday,
      month_birthday,
      year_birthday,
      emails,
      ...rest
    } = result;

    const newPhone = phones?.map(({ phone_code, ...rest }) => ({
      ...rest,
      phone_code: { key: phone_code },
      current: -1,
    }));

    const newEmail = emails?.map((item) => item.email);

    const newAddresses = addresses.filter((item) => item.country !== undefined);

    const final = {
      ...rest,
      phones: newPhone,
      emails: newEmail,
      addresses: newAddresses,
      notice_days,
      remuneration: {
        benefit: benefit,
        currency: currency,
        current_salary: current_salary,
        expectations: expectations,
        future_prospects: future_prospects,
        salary: { from: salary_from, to: salary_to },
        notice_days: notice_days,
      },
    };

    const test = {};
    for (let prop in final) {
      if (final[prop] !== detailCandidate[prop]) {
        test[prop] = final[prop];
      }
    }

    const newData = {
      id: detailCandidate.id,
      params: test,
    };

    dispatch(putNewDetailCandidate(newData))
      .unwrap()
      .then(() => {
        dispatch(fetchDetailCandidateSliceNotLoading(detailCandidate.id));
        setOpen(false);
      })
      .catch(() => {
        setOpen(false);
      });
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  const handleOnValuesChange = () => {
    console.log('change ko');
    setOpen(true);
  };

  return (
    <>
      {detailCandidate.length === 0 ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '40vh',
          }}
        >
          <Spin size="large" tip="Loading" />
        </div>
      ) : (
        <>
          <Row
            style={{
              padding: '8px',
              paddingLeft: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Col span={16}>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to="/candidates">Candidates List</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <span
                    style={{ fontWeight: '500' }}
                  >{`${candidate_id} - ${detailCandidate?.full_name?.toUpperCase()} - ${primaryStatus?.label?.toUpperCase()} - ${flowStatus?.label?.toUpperCase()} `}</span>
                </Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
          <Row
            gutter={(12, 12)}
            style={{
              padding: '8px 30px',
            }}
          >
            <Col span={16}>
              <Form.Provider value={true}>
                <Form
                  form={form}
                  layout="vertical"
                  onFinishFailed={onFinishFailed}
                  onFinish={handleDispatchSave}
                  autoComplete="off"
                  initialValues={initialValues}
                  onValuesChange={handleOnValuesChange}
                >
                  <CardOverview />

                  <Card
                    title="Personal Information"
                    style={{
                      width: '100%',
                    }}
                  >
                    <FormPersonalInformation
                      form={form}
                      phoneNumber={phoneNumber}
                      countries={countries}
                      degree={degree}
                      listCountry={listCountry}
                    />
                  </Card>

                  <Card
                    title="Certificate"
                    style={{
                      width: '100%',
                      marginBottom: '50px',
                    }}
                  >
                    <Form.Item name="certificate_text">
                      <TextArea
                        showCount
                        style={{
                          height: 100,
                          marginBottom: 24,
                        }}
                        placeholder="Certificate"
                      />
                    </Form.Item>
                  </Card>

                  <Card
                    title="Skills And Industry"
                    style={{
                      width: '100%',
                      marginTop: '24px',
                      marginBottom: '50px',
                    }}
                  >
                    <FormSkillAndIndustry detailCandidate={detailCandidate} />
                  </Card>

                  <Card
                    title="EDUCATION AND CERTIFICATE"
                    bordered={false}
                    style={{
                      width: '100%',
                    }}
                  >
                    <TableAcademic candidate_id={detailCandidate.id} />
                    <TableCertificate candidate_id={detailCandidate.id} />
                  </Card>

                  <Card
                    title="WORKING HISTORY"
                    bordered={false}
                    style={{
                      width: '100%',
                    }}
                  >
                    <TableWorkingHistory candidate_id={detailCandidate.id} />
                  </Card>

                  <CardRemunerationAndRewards
                    remuneration={detailCandidate.remuneration}
                    form={form}
                  />

                  {/* <CardAttachments
                    files={files}
                    obj_uid={detailCandidate.id}
                    nameObj="candidates"
                  /> */}

                  {open && (
                    <Form.Item>
                      <div className="sticky-row">
                        <Button
                          style={{ marginRight: '12px' }}
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                          Save
                        </Button>
                      </div>
                    </Form.Item>
                  )}
                </Form>
              </Form.Provider>
            </Col>
            <Col span={8}>
              <CardInterviewLoop />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
