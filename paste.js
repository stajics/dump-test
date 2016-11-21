########################################
#######BANKE
  /banke:
    get:
      security:
        - Bearer: []
      tags:
        - Banka
      summary: Get all banke.
      description: "Requires logged in user to be super_user."
      operationId: getBanke
      consumes:
        - application/json
      produces:
        - application/json
      responses:
        "200":
          description: All banke.
          schema:
            $ref: "#/definitions/BankaResponse"
    post:
      security:
        - Bearer: []
      tags:
        - Banka
      summary: Add new banka.
      description: "Requires logged in user to be super_user."
      operationId: createBanka
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: body
          name: body
          description: Banka object that needs to be added to the banke.
          required: true
          schema:
            $ref: "#/definitions/PostBankeBody"
      responses:
        "201":
          description: Banka created.
          schema:
            $ref: "#/definitions/BankeResponse"
  /banke/{id}:
    get:
      security:
        - Bearer: []
      tags:
        - Banka
      summary: Get banka.
      description: "Requires logged in user to be super_user."
      operationId: getBanka
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: path
          name: id
          description: ID of the banka
          required: true
          type: string
      responses:
        "200":
          description: All users.
          schema:
            $ref: "#/definitions/BankeResponse"
    put:
      security:
        - Bearer: []
      tags:
        - Banka
      summary: Update banka.
      description: "Requires logged in user to be super_user."
      operationId: updateBanka
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: path
          name: id
          description: ID of the banka that needs to be updated
          required: true
          type: string
        - in: body
          name: body
          description: Attributes and values that will be updated.
          required: true
          schema:
            $ref: "#/definitions/PutBankeBody"
      responses:
        "200":
          description: Banka updated.
          schema:
            $ref: "#/definitions/BankeResponse"

    delete:
      security:
        - Bearer: []
      tags:
        - Banka
      summary: Delete banka.
      description: "Requires logged in user to be super_user."
      operationId: deleteUser
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: path
          name: id
          description: ID of the banka that needs to be deleted.
          required: true
          type: string
      responses:
        "200":
          description: Banka deleted.
          schema:
            $ref: "#/definitions/BankeResponse"

//#####################################################
//definitions: models
Banka:
  type: object
  required:
    - id
    - name
    - createdAt
    - updatedAt
  properties:
    id:
      type: string
    name:
      type: string
    createdAt:
      type: string
    updatedAt:
      type: string

//#############################################################
//definitions: params

###############
#Banka
PostBankeBody:
  type: object
  required:
    - name
  properties:
    name:
      type: string

PutBankeBody:
  type: object
  properties:
    name:
      type: string

//#############################################################
//definitions: responses
###################
#Banka
  BankaResponse:
    type: object
    required:
      - status
      - data
    properties:
      status:
        type: string
        enum: ['success']
      data:
        type: object
        required:
          - banke
        properties:
          banke:
            type: 'array'
            items:
              $ref: "#/definitions/Banka"

  BankeResponse:
    type: object
    required:
      - status
      - data
    properties:
      status:
        type: string
        enum: ['success']
      data:
        type: object
        required:
          - banka
        properties:
          banka:
            $ref: "#/definitions/Banka"
