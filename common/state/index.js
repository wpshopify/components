import update from 'immutability-helper'
import isEmpty from 'lodash/isEmpty'
import some from 'lodash/some'
import concat from 'lodash/concat'

function updateNoticesState(existingNotices, newNotice) {
  let updatedNotices = existingNotices

  if (isEmpty(newNotice)) {
    updatedNotices = newNotice
  } else {
    if (!some(existingNotices, newNotice)) {
      updatedNotices = concat(existingNotices, [newNotice])
    } else {
      updatedNotices = existingNotices
    }
  }

  return update(existingNotices, { $set: updatedNotices })
}

export { updateNoticesState }
