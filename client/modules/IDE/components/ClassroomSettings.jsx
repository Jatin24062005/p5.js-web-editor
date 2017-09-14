import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { WithContext as ReactTags } from 'react-tag-input';
import * as ClassroomActions from '../actions/classroom';

class ClassroomSettingsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentID: 0,
      instructorNames: [],
      studentNames: [],
      suggestions: [],
      newName: '',
      newDescription: ''
    };

    this.handleUpdateClassroom = this.handleUpdateClassroom.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleInstructorDelete = this.handleInstructorDelete.bind(this);
    this.handleInstructorAddition = this.handleInstructorAddition.bind(this);
    this.handleStudentDelete = this.handleStudentDelete.bind(this);
    this.handleStudentAddition = this.handleStudentAddition.bind(this);
  }

  componentWillUpdate(nextProps) {
    if (!nextProps.classroom.instructors) return;

    this.state.newName = nextProps.classroom.name;
    this.state.newDescription = nextProps.classroom.description;

    this.state.instructorNames = [];
    nextProps.classroom.instructors.forEach((instructor) => {
      this.state.instructorNames.push({
        id: this.state.instructorNames.length + 1,
        text: instructor.username
      });
    });

    this.state.studentNames = [];
    nextProps.classroom.students.forEach((student) => {
      this.state.studentNames.push({
        id: this.state.studentNames.length + 1,
        text: student.username
      });
    });
  }

  handleUpdateClassroom(e) {
    this.props.classroom.name = this.state.newName;
    this.props.classroom.description = this.state.newDescription;

    this.props.classroom.instructors = [];
    this.state.instructorNames.forEach((instructorName) => {
      this.props.classroom.instructors.push({
        username: instructorName.text
      });
    });

    this.props.classroom.students = [];
    this.state.studentNames.forEach((studentName) => {
      this.props.classroom.students.push({
        username: studentName.text
      });
    });

    this.props.updateClassroom();
  }

  handleNameChange(event) {
    this.setState({ newName: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ newDescription: event.target.value });
  }

  handleInstructorDelete(i) {
    const instructorNames = this.state.instructorNames;
    instructorNames.splice(i, 1);
    this.setState({ instructorNames });
  }

  handleInstructorAddition(tag) {
    const instructorNames = this.state.instructorNames;
    instructorNames.push({
      id: instructorNames.length + 1,
      text: tag
    });
    this.setState({ instructorNames });
  }

  handleStudentDelete(i) {
    const studentNames = this.state.studentNames;
    studentNames.splice(i, 1);
    this.setState({ studentNames });
  }

  handleStudentAddition(tag) {
    const studentNames = this.state.studentNames;
    studentNames.push({
      id: studentNames.length + 1,
      text: tag
    });
    this.setState({ studentNames });
  }

  render() {
    const { instructorNames, studentNames } = this.state;

    return (
      <div
        className="classroom-settings"
        aria-label="classroom settings"
        tabIndex="0"
        role="main"
        id="classroomSettings"
      >
        <form className="classroom-settings__form">
          Name:
          <br />
          <input
            className="classroom-settings__form-element"
            type="text"
            value={this.state.newName}
            onChange={this.handleNameChange}
          />
          <br />
          Description:
          <br />
          <textarea
            className="classroom-settings__form-element classroom-settings__form-element-textarea"
            type="text"
            value={this.state.newDescription}
            onChange={this.handleDescriptionChange}
            cols="50"
            rows="4"
          >
          </textarea>
          <div className="classroom-settings__form-element">
            Instructors:
            <br />
            <ReactTags
              tags={instructorNames}
              handleDelete={this.handleInstructorDelete}
              handleAddition={this.handleInstructorAddition}
              placeholder={'Add instructor'}
            />
          </div>
          <div className="classroom-settings__form-element">
            Students:
            <br />
            <ReactTags
              tags={studentNames}
              handleDelete={this.handleStudentDelete}
              handleAddition={this.handleStudentAddition}
              placeholder={'Add student'}
            />
          </div>
          <input
            className="classroom-settings__form-element"
            type="button"
            value="Update"
            onClick={this.handleUpdateClassroom}
          />
        </form>
      </div>
    );
  }
}

ClassroomSettingsForm.propTypes = {
  classroom: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string.isRequired,
    assignments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired
    })).isRequired,
    instructors: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })).isRequired,
    students: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })).isRequired
  }).isRequired,
  updateClassroom: PropTypes.func.isRequired,
};

ClassroomSettingsForm.defaultProps = {};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, ClassroomActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassroomSettingsForm);