function verifyAllAreDecendantsOf(subjects, ancestors) {
  let result = true;

  if (!Array.isArray(subjects)) {
    subjects = [subjects];
  }

  if (!Array.isArray(ancestors)) {
    ancestors = [ancestors];
  }

  subjects.forEach((subject) => {
    if (result) {
      let subjectFound = false;

      ancestors.forEach((ancestor) => {
        if (
          !subjectFound &&
          (
            ancestor === subject ||
            ancestor.isPrototypeOf(subject)
          )
        ) {
          subjectFound = true;
        }
      });

      if (!subjectFound) {
        result = false;
      }
    }
  });

  return result;
}

module.exports = verifyAllAreDecendantsOf;
