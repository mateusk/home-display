import axios from 'axios'

class MediaDataService {
  baseURL = 'http://localhost:3001/api/media'

  getAll(params) {
    return axios.get(
      `${this.baseURL}`,
      { params },
      {
        headers: {
          'Content-type': 'application/json',
        },
      }
    )
  }

  getSingle(id) {
    return axios.get(`${this.baseURL}/${id}`, {
      headers: {
        'Content-type': 'application/json',
      },
    })
  }

  store(data) {
    return axios
      .post(`${this.baseURL}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(result => {
        console.log('SUCCESS!!')
        return result
      })
      .catch(() => {
        console.log('FAILURE!!')
      })
  }

  update(id, data) {
    return axios.put(`${this.baseURL}/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  delete(id) {
    return axios.delete(`${this.baseURL}/${id}`, {
      headers: {
        'Content-type': 'application/json',
      },
    })
  }
}

export default new MediaDataService()
