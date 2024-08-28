import  Home, { HomeLoader } from './home/Home'
import Root from './home/Root'
import CampainIndex, { CampainIndexLoader } from './campain';
import { CreateCampain } from './campain/create';
import Answer, { QuestionLoader } from './campain/answer';
import AnswerDone from './campain/done';
import ResponseDetail, { ResponseDetailLoader } from './campain/responseDetail';

const routes = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'home',
        element: <Home />,
        loader: HomeLoader
      },

      {
        path: 'campain/:id',
        element: <CampainIndex />,
        loader: CampainIndexLoader
      },
      {
        path: 'campain/:id/response/:uid',
        element: <ResponseDetail />,
        loader: ResponseDetailLoader
      },

      {
        path: 'create',
        element: <CreateCampain />
      },
      {
        path: 'done',
        element: <AnswerDone />
      },

      {
          path: '/answer/:id/:number',
          element: <Answer />,
          loader: QuestionLoader
      }
    ]

  }


]

export default routes;