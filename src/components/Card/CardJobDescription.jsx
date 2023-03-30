import { Row, Col, Card } from 'antd';
import { FormCkeditor } from '../Form/FormCkeditor';
import { SocialWrapper } from '../SocialMedia/SocialWrapper';

export const CardJobDescription = ({ form, detailJob, job_id }) => {
  return (
    <Card
      title="Job Description"
      bordered={false}
      style={{
        width: '100%',
        marginTop: '40px',
      }}
    >
      <Row gutter={(12, 12)} style={{ marginBottom: '16px' }}>
        <Col span={12}>
          <p className="text-label-ckeditor">RESPONSIBILITIES / DAILY DUTIES</p>
          <FormCkeditor
            name="responsibility"
            form={form}
            data={detailJob?.responsibility}
            job_id={job_id}
          />
        </Col>
        <Col span={12}>
          <p className="text-label-ckeditor">ROLE EXPECTATIONS</p>
          <FormCkeditor
            name="expectation"
            form={form}
            data={detailJob?.expectation}
            job_id={job_id}
          />
        </Col>
      </Row>

      <Row gutter={(12, 12)} style={{ marginBottom: '16px' }}>
        <Col span={12}>
          <p className="text-label-ckeditor">MEASURES of SUCCESS? KPIs</p>
          <FormCkeditor
            name="kpi"
            form={form}
            data={detailJob?.kpi}
            job_id={job_id}
          />
        </Col>
        <Col span={12}>
          <p className="text-label-ckeditor">SELLING POINT of THE ROLE</p>
          <FormCkeditor
            name="selling_point"
            form={form}
            data={detailJob?.selling_point}
            job_id={job_id}
          />
        </Col>
      </Row>

      <Row gutter={(12, 12)} style={{ marginBottom: '16px' }}>
        <Col span={12}>
          <p className="text-label-ckeditor">DEPARTMENT STRUCTURE</p>
          <FormCkeditor
            name="department_structure"
            form={form}
            data={detailJob?.department_structure}
            job_id={job_id}
          />
        </Col>
        <Col span={12}>
          <p className="text-label-ckeditor">COMPETENCIES / BEHAVIOURS</p>
          <FormCkeditor
            name="competency"
            form={form}
            data={detailJob?.competency}
            job_id={job_id}
          />
        </Col>
      </Row>

      <Row gutter={(12, 12)} style={{ marginBottom: '16px' }}>
        <Col span={12}>
          <p className="text-label-ckeditor">DEVELOPMENT OPPORTUNITIES</p>
          <FormCkeditor
            name="development_opportunity"
            form={form}
            data={detailJob?.development_opportunity}
            job_id={job_id}
          />
        </Col>
        <Col span={12}>
          <p className="text-label-ckeditor">SUCCESSFUL FILL RATE</p>
          <FormCkeditor
            name="fill_rate"
            form={form}
            data={detailJob?.fill_rate}
            job_id={job_id}
          />
        </Col>
      </Row>

      <Row gutter={(12, 12)} style={{ marginBottom: '16px' }}>
        <Col span={12}>
          <p className="text-label-ckeditor">RECRUITMENT PROCESS</p>
          <FormCkeditor
            name="recruitment_process"
            form={form}
            data={detailJob?.recruitment_process}
            job_id={job_id}
          />
        </Col>
      </Row>

      <Row gutter={(12, 12)}>
        <Col span={24}>
          <SocialWrapper data={detailJob?.social_media} job_id={job_id} />
        </Col>
      </Row>
    </Card>
  );
};
