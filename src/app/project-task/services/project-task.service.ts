import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStoargeService } from 'src/app/basic/services/storage/user-stoarge.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class ProjectTaskService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(BASIC_URL + `api/company/users`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  postTask(taskDto: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/company/task', taskDto, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getAllTasks(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/company/tasks', {
      headers: this.createAuthorizationHeader(),
    })
  }

  getTaskById(id: number): Observable<any> {
    return this.http.get(BASIC_URL + `api/company/task/${id}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  updateTask(id: number, taskDto: any): Observable<any> {
    return this.http.put(BASIC_URL + `api/company/task/${id}`, taskDto, {
      headers: this.createAuthorizationHeader(),
    })
  }

  deleteTask(id: number,): Observable<any> {
    return this.http.delete(BASIC_URL + `api/company/task/${id}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  searchTasks(title: string): Observable<any> {
    return this.http.get(BASIC_URL + `api/company/tasks/search/${title}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  createComment(taskId: number, content: string): Observable<any> {
    const params = {
      taskId: taskId,
      postedBy: UserStoargeService.getUserId(),
    };
    return this.http.post<any>(BASIC_URL + `api/company/comments/create`, content,
     {
      params: params,
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllCommentsByTaskId(taskId: number): Observable<any> {
    return this.http.get<any>(BASIC_URL + `api/company/comments/${taskId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStoargeService.getToken()
    )
  }


}
