import { Modal, Form, Input, Select, Button, Row, message } from 'antd'
import CourseApi from '../../apis/CourseApi';
import { useHistory } from 'react-router-dom'

const { Option } = Select;

const CourseModal = (props) => {
    
    const levels = [1,2,3,4,5]
    const {course, cleanup, visible, title, setVisible, setLoading} = props
    const [form] = Form.useForm();

    const submitForm = (e) => {
        setLoading(true)
        if (course != null) {
            e.id = course.id
            CourseApi.ModifyCourse(e).then((response) => {
                message.success(response.data.message);
            }).catch( (err) => {
                message.error(err.response.data.message);
            });
        }
        else {
            CourseApi.AddCourse(e).then((response) => {
                message.success(response.data.message);
            }).catch( (err) => {
                message.error(err.response.data.message);
            });
        }
        setLoading(false)
        setVisible(false);
    };

    return (
        <div>
            <Modal
            title={title}
            footer={null}
            width={650}
            onOk={() => submitForm()}
            onCancel={cleanup}
            visible={visible}
            >
                <Form form={form} onFinish={submitForm}>
                    <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please choose a name for this course',
                        },
                    ]}
                    initialValue={course ? course.name : undefined}
                    >
                        <Input placeholder="Name" />
                    </Form.Item>
                    <Form.Item
                    label="Description"
                    name="description"
                    initialValue={course ? course.description : undefined}
                    >
                        <Input placeholder="Description" />
                    </Form.Item>
                    <Form.Item
                    label="Level"
                    name="level"
                    rules={[
                        {
                            required: true,
                            message: 'Please choose a level for this course',
                        },
                    ]}
                    initialValue={course ? course.level : undefined}
                    >
                        <Select placeholder="Level">
                            {
                                levels.map( (level) => {
                                    return <Option key={level} value={level}>
                                                {level.toString()}
                                            </Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <br />
                    <Row type="flex" justify="center">
                        <Button
                        style={{ marginRight: "5px" }}
                        type="default"
                        onClick={cleanup}
                        >
                            Cancel
                        </Button>
                        <Form.Item shouldUpdate>
                        {() => (
                            <Button
                            type="primary"
                            disabled={
                                form.getFieldsError().filter(({ errors }) => errors.length).length
                            }
                            htmlType="submit"
                            >
                                Submit
                            </Button>
                        )}
                        </Form.Item>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default CourseModal;